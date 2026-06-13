import joblib, pandas as pd, os

current_dir = os.path.dirname(__file__)

model_path = os.path.join(
    current_dir,
    "model.pkl"
)

model = joblib.load(
    model_path
)

def predict_state(state):

    features = pd.DataFrame([{

    "throughput": state["throughput"],
    "thermal_load": state["thermal_load"],
    "power_usage": state["power_usage"],
    "storage_health": state["storage_health"],
    "cooling_efficiency": state["cooling_efficiency"],
    "material_availability": state["material_availability"],
    "deadline_pressure": state["deadline_pressure"],
    "maintenance_health": state["maintenance_health"],
    "machine_health": state["machine_health"],
    "inventory_level": state["inventory_level"],
    "defect_rate": state["defect_rate"],
    "line_utilization": state["line_utilization"],
    "energy_cost": state["energy_cost"]

}])

    prediction = model.predict(
        features
    )[0]

    confidence = max(

        model.predict_proba(
            features
        )[0]

    )

    return {

        "severity":
            str(prediction),

        "confidence":
            float(round(
                confidence * 100,
                2
            ))

    }