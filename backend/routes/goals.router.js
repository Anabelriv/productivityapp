const express = require("express");
//const { logger } = require("../middlewares/utils.js");

const {
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal
} = require("../controllers/goals.controller.js");

//const { verifyToken } = require("../middlewares/verify.token.js");

const goal_router = express.Router();

// CRUD - Read - get all goals
goal_router.get("/:userEmail", getAllGoals);


// body - POST/PUT
goal_router.post("/", createGoal);

// CRUD - Edit a goal - PUT
goal_router.put("/:goal_id", updateGoal);

// CRUD - Delete a product - DELETE
goal_router.delete("/:goal_id", deleteGoal);

module.exports = { goal_router };