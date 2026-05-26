from engine.evaluate import evaluate_factory

def get_operator_response():

    decisions = evaluate_factory()

    return {
        "decisions": decisions
    }