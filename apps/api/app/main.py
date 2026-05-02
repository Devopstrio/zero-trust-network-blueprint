from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from core.policies.engine import IdentityEngine, PolicyEngine, SegmentationEngine, PostureEngine

app = FastAPI(title="Zero Trust Network Blueprint API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

identity_engine = IdentityEngine()
policy_engine = PolicyEngine()
segmentation = SegmentationEngine()
posture = PostureEngine()

@app.get("/health")
def health():
    return {"status": "ok", "service": "zero-trust-network-blueprint"}

@app.post("/access/request")
def request_access(data: dict = Body(...)):
    identity_id = data.get("identity")
    resource = data.get("resource")
    
    # 1. Identity Verification
    id_result = identity_engine.verify_request(identity_id, {})
    if id_result["status"] != "VERIFIED":
        raise HTTPException(status_code=403, detail=id_result["reason"])
        
    # 2. Policy Evaluation
    decision = policy_engine.evaluate(id_result["identity"], resource)
    
    return {
        "decision": decision,
        "identity": identity_id,
        "resource": resource,
        "link": segmentation.microsegment(identity_id, resource) if decision == "ALLOW" else None
    }

@app.get("/dashboard/summary")
def get_summary():
    return {
        "total_identities": 1250,
        "verified_sessions": 842,
        "active_segments": 420,
        "security_posture": "OPTIMAL",
        "threat_level": "LOW"
    }

@app.get("/metrics")
def get_metrics():
    return {
        "access_denial_rate": 0.05,
        "avg_verification_ms": 12.4,
        "posture_drift_signals": 2
    }
