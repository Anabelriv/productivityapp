import pulp
import pandas as pd
import sys
import json
from datetime import datetime, timezone

# reading the json file

with open("data_for_pulpy.json", "r") as file:
    goalsjson = json.load(file)
print("jsongoals", goalsjson)
# converting to CSV
goals_data = pd.DataFrame(goalsjson)

# Pulp function
problem_name = "Goaltester"


def optimize_goal_selection(goals_data, free_time):
    # Create a linear programming problem
    prob = pulp.LpProblem(problem_name, pulp.LpMaximize)

    # Create decision variables for each goal
    decision_variables = []
    for rownum, row in goals_data.iterrows():
        variable = str("x" + str(rownum))
        variable = pulp.LpVariable(str(variable), lowBound=0, upBound=1, cat="Integer")
        decision_variables.append(variable)
    # Add the total goals constraint to the problem
    prob += pulp.lpSum(decision_variables)  # Total goals

    # Convert the "date" column to datetime objects
    goals_data["date"] = pd.to_datetime(goals_data["date"])

    # Calculate the days remaining until the due date
    today = datetime.now(timezone.utc)
    goals_data["days_remaining"] = (goals_data["date"] - today).dt.days

    # Add constraints to the problem
    total_time_required = pulp.lpSum(
        row["difficulty"] * decision_variables[i] for i, row in goals_data.iterrows()
    )
    prob += total_time_required <= free_time

    # Add the objective function to the problem
    objective_function = pulp.lpSum(
        row["days_remaining"] * decision_variables[i]
        for i, row in goals_data.iterrows()
    )  # Minimize days remaining
    objective_function += pulp.lpSum(
        row["id_importance"] * decision_variables[i] for i, row in goals_data.iterrows()
    )  # Maximize importance
    objective_function += pulp.lpSum(
        -row["difficulty"] * decision_variables[i] for i, row in goals_data.iterrows()
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
    selected_goal = goals_data.loc[selected_goal_index]
    # Print the selected goal as JSON
    print(json.dumps(selected_goal.to_dict(), default=str))

    print("Selected Goal:")
    print(selected_goal)

    # Export the selected goal
    selected_goal.to_csv("selected_goal.csv", index=False)
    print("The selected goal is exported to 'selected_goal.csv'")


freeTime = 15
optimize_goal_selection(goals_data, freeTime)

# if __name__ == "__main__":
#     # Extract parameters from command line arguments
#     goals = sys.argv[1]
#     # print("Received JSON file path:", goals_json_path)
#     userEmail = "undefined"
#     # userEmail = sys.argv[2]
#     freeTime = 15
#     # freeTime = int(sys.argv[3])

#     # Load goals from the JSON file
#     # goals = load_goals_from_file(goals_json_path)

#     # Perform the optimization
#     optimize_goal_selection(goals, freeTime)
