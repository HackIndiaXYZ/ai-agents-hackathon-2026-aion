from simulation.factory_state import factory_state

def propagate_state():

    if factory_state["thermal_load"] > 80:
        factory_state["defect_rate"] += 5
    
    if factory_state["machine_health"] < 60:
        factory_state["throughput"] -= 10

    if factory_state["inventory_level"] < 30:
        factory_state["throughput"] -= 15

    if factory_state["deadline_pressure"] > 80:
        factory_state["energy_cost"] += 10

    if factory_state["defect_rate"] > 20:
        factory_state["throughput"] -= 10