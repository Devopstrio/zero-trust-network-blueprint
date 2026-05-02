.PHONY: help build up down seed test

help:
	@echo "Zero Trust Network Blueprint - Management Commands"
	@echo "------------------------------------------------"
	@echo "build     : Build all containers"
	@echo "up        : Start all services"
	@echo "down      : Stop all services"
	@echo "enforce   : Enforce Zero Trust policies"
	@echo "simulate  : Simulate access requests"
	@echo "test      : Run system tests"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

enforce:
	python scripts/enforce/apply_policies.py

simulate:
	python scripts/simulate/request_access.py

test:
	pytest tests/
