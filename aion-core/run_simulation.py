import sys

from interface.export_state import export_simulation

event = "factory_reset"
magnitude = 50

if len(sys.argv) > 1:
    event = sys.argv[1]

if len(sys.argv) > 2 :   
    magnitude = int(sys.argv[2])

export_simulation(event, magnitude)