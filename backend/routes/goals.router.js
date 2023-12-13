const express = require("express");

const {
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal
} = require("../controllers/goals.controller.js");


const goal_router = express.Router();

// CRUD - Read - get all goals
goal_router.get("/:userEmail", getAllGoals);

// CRUD - POST/PUT
goal_router.post("/:userEmail", createGoal);

// CRUD - Edit a goal - PUT
goal_router.put("/:userEmail/:goal_id", updateGoal);

// CRUD - Delete a goal - DELETE
goal_router.delete("/:goal_id", deleteGoal);

module.exports = { goal_router };
