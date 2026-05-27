from engine.evaluate import evaluate_factory
from simulation.factory_state import factory_state
from logs.event_logger import log_event

def get_operator_response(event="system check"):

    decisions = evaluate_factory()

    log_entry = log_event(
        event,
        factory_state,
        decisions
    )
    
    return {
        "decisions": decisions,
        "log": log_entry
    }