import random
import pandas as pd
import sys, os

sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            ".."
        )
    )
)

from simulation.factory_state import (
    factory_state,
    DEFAULT_FACTORY_STATE
)

from simulation.disturbances import (
    apply_disturbance
)

from interface.bridge import (
    get_operator_response
)

events = [
    "power_surge",
    "cooling_failure",
    "material_shortage",
    "high_demand",
    "reduce_demand",
    "stabilize_cooling"
]

rows = []

NUM_SAMPLES = 10000

for _ in range(NUM_SAMPLES):

    factory_state.clear()
    factory_state.update(
        DEFAULT_FACTORY_STATE
    )

    event = random.choice(events)

    magnitude = random.randint(
        0,
        100
    )

    apply_disturbance(
        event,
        magnitude
    )

    response = get_operator_response(
        event
    )

    rows.append({

        "throughput":
            factory_state["throughput"],

        "thermal_load":
            factory_state["thermal_load"],

        "power_usage":
            factory_state["power_usage"],

        "storage_health":
            factory_state["storage_health"],

        "cooling_efficiency":
            factory_state["cooling_efficiency"],

        "material_availability":
            factory_state["material_availability"],

        "deadline_pressure":
            factory_state["deadline_pressure"],

        "maintenance_health":
            factory_state["maintenance_health"],

        "machine_health":
            factory_state["machine_health"],

        "inventory_level":
            factory_state["inventory_level"],

        "defect_rate":
            factory_state["defect_rate"],

        "line_utilization":
            factory_state["line_utilization"],

        "energy_cost":
            factory_state["energy_cost"],

        "severity":
            response["severity"]

    })

df = pd.DataFrame(rows)

df.to_csv(
    "dataset.csv",
    index=False
)

print(
    f"Generated {NUM_SAMPLES} samples."
)