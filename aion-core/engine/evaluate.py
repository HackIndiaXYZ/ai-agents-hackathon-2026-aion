import math
from simulation.factory_state import factory_state
from protocols.operations_protocol import *

def evaluate_factory():

    decisions = []
    
    quality_risk = min(factory_state["defect_rate"] * 5, 100)

    operational_risks = [
        100 - factory_state["material_availability"],
        100 - factory_state["inventory_level"],
        factory_state["deadline_pressure"],
        100 - factory_state["throughput"],
        quality_risk
    ]
    
    infrastructure_risks = [
        factory_state["thermal_load"],
        factory_state["power_usage"],
        100 - factory_state["machine_health"],
        100 - factory_state["cooling_efficiency"],
        100 - factory_state["storage_health"]
    ]
    
    operational_risk = round(
        math.sqrt(
            sum(r**2 for r in operational_risks)
            /
            len(operational_risks)
        ),
        2
    )

    infrastructure_risk = round(
        math.sqrt(
            sum(r**2 for r in infrastructure_risks)
            /
            len(infrastructure_risks)
        ),
        2
    )

    highest_risk = max(
    operational_risk,
    infrastructure_risk
    )

    if highest_risk < 50:
        severity = "NORMAL"

    elif highest_risk < 75:
        severity = "WARNING"

    else:
        severity = "CRITICAL"
    
    if factory_state["power_usage"] > SAFE_POWER_LIMIT:
      severity = "WARNING"

    if factory_state["thermal_load"] > SAFE_THERMAL_LIMIT:
      severity = "WARNING"

    if (
        factory_state["power_usage"] > SAFE_POWER_LIMIT
        and
        factory_state["thermal_load"] > SAFE_THERMAL_LIMIT
    ):
        severity = "CRITICAL"


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
    
    if factory_state["deadline_pressure"] > 80:
        decisions.append(
            "Production deadlines approaching operational limits."
        )

    if factory_state["machine_health"] < 60:
        decisions.append(
            "Schedule maintenance on affected production line."
        )

    if factory_state["inventory_level"] < 30:
        decisions.append(
            "Inventory critically low. Request material replenishment."
        )
    
    if factory_state["defect_rate"] > 20:
        decisions.append(
            "Defect rate rising. Initiate quality assurance inspection."
        )

    if factory_state["material_availability"] < 40:
        decisions.append(
            "Material supply disruption detected. Initiate supplier recovery protocol."
        )    

    if factory_state["inventory_level"] < 40:
        decisions.append(
            "Inventory reserves declining. Prioritize replenishment."
        )    
    
    print("DECISIONS:",decisions)
    print("SEVERITY:",severity)

    if not decisions:

        if severity == "CRITICAL":

            decisions.append(
                "Multiple operational risks detected. Immediate intervention recommended."
            )

        elif severity == "WARNING":

            decisions.append(
                "Operational metrics drifting from nominal conditions."
            )

        else:

            decisions.append(
                "System operating within acceptable operational limits."
            )   

    return {
        "severity": severity,
        "operational_risk": operational_risk,
        "infrastructure_risk": infrastructure_risk,
        "overall_risk": highest_risk,
        "decisions": decisions    
    }