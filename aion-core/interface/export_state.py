import json, os

from interface.bridge import get_operator_response
from simulation.factory_state import factory_state
from simulation.disturbances import apply_disturbance
from ai.predictor import predict_state

def export_simulation(event, magnitude):

    apply_disturbance(event, magnitude)

    response = get_operator_response(event)
    ai_prediction = predict_state(factory_state)

    export_data = {
        "factory_state": factory_state,
        "response": response,
        "ai_prediction": ai_prediction
    }
    
    current_dir = os.path.dirname(__file__)

    output_path = os.path.abspath(
        os.path.join(
            current_dir,
            "../../aion-frontend/public/simulation_output.json"
        )
    )
    
    with open(output_path,"w") as file:
        json.dump(export_data, file, indent=4)
    
    print(f"Simulation exported to {output_path}")