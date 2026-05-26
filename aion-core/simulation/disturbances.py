from simulation.factory_state import factory_state
import random

def apply_disturbance(event):

    if event == "cooling_failure":

        factory_state["thermal_load"] += random.randint(10, 18)
        factory_state["cooling_efficiency"] -= random.randint(8, 15)
        factory_state["throughput"] -= random.randint(5, 12)

    elif event == "power_surge":

        factory_state["power_usage"] += random.randint(15, 25)
        factory_state["thermal_load"] += random.randint(6, 12)

    elif event == "material_shortage":

        factory_state["material_availability"] -= random.randint(20, 35)
        factory_state["throughput"] -= random.randint(10, 20)

    elif event == "high_demand":

        factory_state["deadline_pressure"] += random.randint(15, 30)
        factory_state["throughput"] += random.randint(8, 16)
        factory_state["power_usage"] += random.randint(6, 14)

    normalize_state()


def normalize_state():

    for key in factory_state:

        if isinstance(factory_state[key], int):

            if factory_state[key] < 0:
                factory_state[key] = 0

            if factory_state[key] > 100:
                factory_state[key] = 100