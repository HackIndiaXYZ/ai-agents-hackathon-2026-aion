import pandas as pd

df = pd.read_csv(r"C:\\Users\\amanu\\OneDrive\\Documents\\ai-agents-hackathon-2026-aion\\aion-core\\ai\\dataset.csv")

print(df.head())

print(df["severity"].value_counts)