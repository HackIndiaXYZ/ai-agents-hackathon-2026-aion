from interface.bridge import get_operator_response
from simulation.factory_state import factory_state
from simulation.disturbances import apply_disturbance

print("\nINITIAL STATE:\n")
print(factory_state)

apply_disturbance("power_surge")
response = get_operator_response("power_surge")

print("\nUPDATED STATE:\n")
print(factory_state)

print("\nAION RESPONSE:\n")
print(get_operator_response())