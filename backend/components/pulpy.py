import pulp
import pandas as pd
from datetime import datetime

data = pd.read_csv("/Users/anabelrivera/Downloads/test_goal.csv")
problem_name = "Goaltester"


def optimize_goal_selection(free_time):
    prob = pulp.LpProblem(problem_name, pulp.LpMaximize)

    decision_variables = []
    for rownum, row in data.iterrows():
        variable = str("x" + str(rownum))
        variable = pulp.LpVariable(str(variable), lowBound=0, upBound=1, cat="Integer")
        decision_variables.append(variable)

    total_goals = pulp.lpSum(decision_variables)
    prob += total_goals

    # Convert the "date" column to datetime objects
    data["date"] = pd.to_datetime(data["date"])

    # Calculate the days remaining until the due date
    today = datetime.now()
    data["days_remaining"] = (data["date"] - today).dt.days

    # Constraints
    total_time_required = pulp.lpSum(
        row["difficulty"] * decision_variables[i] for i, row in data.iterrows()
    )
    prob += total_time_required <= free_time

    # Objective function
    objective_function = pulp.lpSum(
        row["days_remaining"] * decision_variables[i] for i, row in data.iterrows()
    )  # Minimize days remaining
    objective_function += pulp.lpSum(
        row["id_importance"] * decision_variables[i] for i, row in data.iterrows()
    )  # Maximize importance
    objective_function += pulp.lpSum(
        -row["difficulty"] * decision_variables[i] for i, row in data.iterrows()
    )  # Minimize difficulty
    prob += objective_function

    # Solve the optimization problem
    optimization_result = prob.solve()
    assert optimization_result == pulp.LpStatusOptimal

    # Get the decision variable values
    decision_values = [v.varValue for v in prob.variables()]

    # Find the index of the goal with the highest decision variable value
    selected_goal_index = decision_values.index(max(decision_values))

    # Print and export the selected goal
    selected_goal = data.loc[selected_goal_index]
    print("Selected Goal:")
    print(selected_goal)

    # Export the selected goal
    selected_goal.to_csv("selected_goal.csv", index=False)
    print("The selected goal is exported to 'selected_goal.csv'")


if __name__ == "__main__":
    free_time = int(input("Enter the amount of free time in minutes: "))
    optimize_goal_selection(free_time)
