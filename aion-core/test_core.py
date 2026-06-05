from interface.bridge import get_operator_response
from simulation.factory_state import factory_state
from simulation.disturbances import apply_disturbance

print("\nINITIAL STATE:\n")
print(factory_state)

apply_disturbance("power_surge", 100)

print("\nAFTER DISTURBANCE:\n")
print(factory_state)

response = get_operator_response("power_surge")

print("\nAION RESPONSE:\n")
print(response)