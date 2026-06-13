import sys, os

sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            ".."
        )
    )
)

from predictor import predict_state

from simulation.factory_state import (
    factory_state
)

print(
    predict_state(
        factory_state
    )
)