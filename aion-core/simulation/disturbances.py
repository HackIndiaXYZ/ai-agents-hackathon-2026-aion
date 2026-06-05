from simulation.factory_state import factory_state, DEFAULT_FACTORY_STATE
from simulation.state_dynamics import propagate_state
import random

def apply_disturbance(event, magnitude=50):
    
    scale = 0.1 + (magnitude / 50)

    if event == "cooling_failure":

        factory_state["thermal_load"] += int(scale*random.randint(10, 18))
        factory_state["cooling_efficiency"] -= int(scale*random.randint(8, 15))
        factory_state["throughput"] -= int(scale*random.randint(5, 12))
        factory_state["defect_rate"] += int(scale*random.randint(5,15))
        propagate_state()

    elif event == "power_surge":

        factory_state["power_usage"] += int(scale*random.randint(15, 25))
        factory_state["thermal_load"] += int(scale*random.randint(6, 12))
        factory_state["machine_health"] -= int(scale*random.randint(5,15))
        factory_state["energy_cost"] += int(scale*random.randint(10,20))
        propagate_state()

    elif event == "material_shortage":

        factory_state["material_availability"] -= int(scale*random.randint(20, 35))
        factory_state["throughput"] -= int(scale*random.randint(10, 20))
        factory_state["inventory_level"] -= int(scale*random.randint(15,30))
        propagate_state()

    elif event == "high_demand":

        factory_state["deadline_pressure"] += int(scale*random.randint(15, 30))
        factory_state["throughput"] += int(scale*random.randint(8, 16))
        factory_state["power_usage"] += int(scale*random.randint(6, 14))
        factory_state["inventory_level"] -= int(scale*random.randint(10,30))
        propagate_state()

    elif event == "stabilize_cooling":

        factory_state["thermal_load"] -= int(scale*random.randint(10, 20))
        factory_state["cooling_efficiency"] += int(scale*random.randint(5, 15))
        factory_state["defect_rate"] -= int(scale*random.randint(1, 5))
        propagate_state()

    elif event == "reduce_demand":

        factory_state["deadline_pressure"] -= int(scale*random.randint(15, 25))
        factory_state["line_utilization"] -= int(scale*random.randint(10, 20))
        factory_state["power_usage"] -= int(scale*random.randint(5, 15))
        propagate_state()   

    elif event == "factory_reset":
        factory_state.clear()
        factory_state.update(
            DEFAULT_FACTORY_STATE
        )    


    normalize_state()

def normalize_state():

    for key in factory_state:

        if isinstance(factory_state[key], int):

            if factory_state[key] < 0:
                factory_state[key] = 0

            if factory_state[key] > 100:
                factory_state[key] = 100