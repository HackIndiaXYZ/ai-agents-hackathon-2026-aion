from engine.evaluate import evaluate_factory
from simulation.factory_state import factory_state
from logs.event_logger import log_event

def get_operator_response(event="system check"):

    evaluation = evaluate_factory()

    log_entry = log_event(
        event,
        factory_state,
        evaluation
    )
    
    return {
    "severity": evaluation["severity"],
    "operational_risk": evaluation["operational_risk"],
    "infrastructure_risk": evaluation["infrastructure_risk"],
    "overall_risk": evaluation["overall_risk"],
    "decisions": evaluation["decisions"],
    "log": log_entry
    }