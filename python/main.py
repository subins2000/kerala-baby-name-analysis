import sqlite3
import pandas as pd
import matplotlib.pyplot as plt


# -----------------------------
# Load Data
# -----------------------------

DB_PATH = "../data/db.sqlite"

OUTPUT_FILE = "top10_female_over_time.png"


conn = sqlite3.connect(DB_PATH)

df = pd.read_sql(
  "SELECT name, gender, year, count FROM humans",
  conn
)

conn.close()


# -----------------------------
# Filter Female Names
# -----------------------------

female_df = df[df["gender"] == "F"]


# -----------------------------
# Get Top 10 Female Names (All Time)
# -----------------------------

top10 = (
  female_df
  .groupby("name")["count"]
  .sum()
  .nlargest(10)
  .index
)


# -----------------------------
# Aggregate By Year
# -----------------------------

trend = (
  female_df[female_df["name"].isin(top10)]
  .groupby(["year", "name"])["count"]
  .sum()
  .reset_index()
)


# -----------------------------
# Plot
# -----------------------------

plt.figure()

for name in top10:
  sub = trend[trend["name"] == name]

  plt.plot(
    sub["year"],
    sub["count"],
    label=name
  )

plt.title("Top 10 Female Names Over Time (1920–2007)")
plt.xlabel("Year")
plt.ylabel("Count")

plt.legend()
plt.tight_layout()


# -----------------------------
# Save
# -----------------------------

plt.savefig(OUTPUT_FILE, dpi=300)
plt.close()

print(f"Saved: {OUTPUT_FILE}")
