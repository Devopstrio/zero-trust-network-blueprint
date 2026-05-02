module "zt_network" {
  source = "./modules/networking"

  vpc_cidr = "10.70.0.0/16"
}

module "zt_policy_cluster" {
  source = "./modules/compute"

  cluster_name = "zero-trust-policy-hub"
  node_count   = 3
}

module "zt_metadata_db" {
  source = "./modules/database"

  instance_class = "db.t3.medium"
}

resource "kubernetes_namespace" "zt_ops" {
  metadata {
    name = "zero-trust-network-blueprint"
  }
}

resource "aws_security_group" "zt_proxy_sg" {
  name        = "zero-trust-access-proxy-sg"
  description = "Security group for ZT access proxy"
  vpc_id      = module.zt_network.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_iam_role" "zt_policy_evaluator" {
  name = "zero-trust-policy-evaluator-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      },
    ]
  })
}
