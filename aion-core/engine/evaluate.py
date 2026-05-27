from simulation.factory_state import factory_state
from protocols.operations_protocol import *

def evaluate_factory():

    decisions = []
    severity = "NORMAL"

    if factory_state["thermal_load"] > SAFE_THERMAL_LIMIT:
        severity = "CRITICAL"
        
        decisions.append(
            "Reduce throughput and cooling load."
        )

    if factory_state["power_usage"] > SAFE_POWER_LIMIT:
        severity = "CRITICAL"
        
        decisions.append(
            "Activate auxiliary power stabilization."
        )    

    if factory_state["storage_health"] < MIN_STORAGE_HEALTH:
        severity = "WARNING"
        
        decisions.append(
            "Reduce storage routing pressure."
        )    
    
    if factory_state["deadline_pressure"] > 80:
        severity = "WARNING"

        decisions.append(
            "Production deadlines approaching operational limits."
        )


    if len(decisions) == 0:
        decisions.append(
            "System operating within optimal thresholds."
        )    

    return {
        "severity": severity,
        "decisions": decisions    
    }