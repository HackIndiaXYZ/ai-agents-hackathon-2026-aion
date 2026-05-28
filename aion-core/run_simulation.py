import sys

from interface.export_state import export_simulation

event = "system_check"

if len(sys.argv) > 1:
    event = sys.argv[1]

export_simulation(event)