from simulation.factory_state import factory_state
from protocols.operations_protocol import *

def evaluate_factory():

    decisions = []

    if factory_state["thermal_load"] > SAFE_THERMAL_LIMIT:
        decisions.append(
            "Reduce throughput and cooling load."
        )

    if factory_state["power_usage"] > SAFE_POWER_LIMIT:
        decisions.append(
            "Activate auxiliary power stabilization."
        )    

    if factory_state["storage_health"] < MIN_STORAGE_HEALTH:
        decisions.append(
            "Reduce storage routing pressure."
        )    

    if len(decisions) == 0:
        decisions.append(
            "System operating within optimal thresholds."
        )    

    return decisions    