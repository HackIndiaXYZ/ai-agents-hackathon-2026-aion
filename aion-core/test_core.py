from interface.bridge import get_operator_response
from simulation.factory_state import factory_state
from simulation.disturbances import apply_disturbance

print("\nINITIAL STATE:\n")
print(factory_state)

apply_disturbance("cooling_failure")

print("\nAFTER DISTURBANCE:\n")
print(factory_state)

response = get_operator_response("cooling_failure")

print("\nAION RESPONSE:\n")
print(response)