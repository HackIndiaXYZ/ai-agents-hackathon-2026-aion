from simulation.factory_state import factory_state, DEFAULT_FACTORY_STATE
from simulation.state_dynamics import propagate_state
import random

def apply_disturbance(event):

    if event == "cooling_failure":

        factory_state["thermal_load"] += random.randint(10, 18)
        factory_state["cooling_efficiency"] -= random.randint(8, 15)
        factory_state["throughput"] -= random.randint(5, 12)
        factory_state["defect_rate"] += random.randint(5,15)
        propagate_state()

    elif event == "power_surge":

        factory_state["power_usage"] += random.randint(15, 25)
        factory_state["thermal_load"] += random.randint(6, 12)
        factory_state["machine_health"] -= random.randint(5,15)
        factory_state["energy_cost"] += random.randint(10,20)
        propagate_state()

    elif event == "material_shortage":

        factory_state["material_availability"] -= random.randint(20, 35)
        factory_state["throughput"] -= random.randint(10, 20)
        factory_state["inventory_level"] -= random.randint(15,30)
        propagate_state()

    elif event == "high_demand":

        factory_state["deadline_pressure"] += random.randint(15, 30)
        factory_state["throughput"] += random.randint(8, 16)
        factory_state["power_usage"] += random.randint(6, 14)
        factory_state["inventory_level"] -= random.randint(10,30)
        propagate_state()

    elif event == "stabilize_cooling":

        factory_state["thermal_load"] -= random.randint(10, 20)
        factory_state["cooling_efficiency"] += random.randint(5, 15)
        factory_state["defect_rate"] -= random.randint(1, 5)
        propagate_state()

    elif event == "reduce_demand":

        factory_state["deadline_pressure"] -= random.randint(15, 25)
        factory_state["line_utilization"] -= random.randint(10, 20)
        factory_state["power_usage"] -= random.randint(5, 15)
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