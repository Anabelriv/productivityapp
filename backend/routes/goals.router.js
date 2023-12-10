const express = require("express");

const {
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal
} = require("../controllers/goals.controller.js");

const { verifyToken } = require("../middlewares/verifyToken.js");

const goal_router = express.Router();

// CRUD - Read - get all goals
goal_router.get("/:userEmail", getAllGoals)
//goal_router.get("/:user_email", verifyToken, getAllGoals);

// CRUD - POST/PUT
goal_router.post("/:userEmail", createGoal);

//goal_router.post("/", verifyToken, createGoal);

// CRUD - Edit a goal - PUT
goal_router.put("/:goal_id", updateGoal);

//goal_router.put("/:useEmail/:goal_id", verifyToken, updateGoal);

// CRUD - Delete a goal - DELETE
goal_router.delete("/:goal_id", deleteGoal);

//goal_router.delete("/:userEmail/:goal_id", verifyToken, deleteGoal);

module.exports = { goal_router };
