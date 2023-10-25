const express = require("express");
const { logger } = require("../middlewares/utils.js");

const {
    getAllGoals,
    getGoal,
    createGoal,
    editGoal,
    deleteGoal,
} = require("../controllers/goals.controller.js");

const { verifyToken } = require("../middlewares/verify.token.js");

const p_router = express.Router();

// CRUD - Read - get all goals
p_router.get("/goals", getAllGoals);

// // CRUD - Read - get all products
// p_router.get("/search", searchProduct);

// CRUD - Read - get one goal
p_router.get("/:id", getGoal);

// body - POST/PUT
p_router.post("/newgoal", createGoal);

// CRUD - Edit a goal - PUT
p_router.put("/:id", editGoal);

// CRUD - Delete a product - DELETE
p_router.delete("/:id", deleteGoal);

module.exports = { p_router };