import os
import pandas as pd

from sklearn.model_selection import (
    train_test_split
)

from sklearn.neural_network import (
    MLPClassifier
)

from sklearn.metrics import (
    classification_report
)

import joblib

current_dir = os.path.dirname(__file__)

dataset_path = os.path.join(
    current_dir,
    "dataset.csv"
)

model_path = os.path.join(
    current_dir,
    "model.pkl"
)

df = pd.read_csv(
    dataset_path
)

X = df.drop(
    columns=["severity"]
)

y = df["severity"]

X_train, X_test, y_train, y_test = (
    train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )
)

model = MLPClassifier(
    hidden_layer_sizes=(32,16),
    activation="relu",
    max_iter=500,
    random_state=42
)

model.fit(
    X_train,
    y_train
)

predictions = model.predict(
    X_test
)

print(
    classification_report(
        y_test,
        predictions
    )
)

joblib.dump(
    model,
    model_path
)

print(
    f"Model saved to {model_path}"
)

print(
    df["severity"].value_counts()
)