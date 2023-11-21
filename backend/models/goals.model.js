const { db } = require("../config/db.js");

const _getAllGoals = () => {
    return db("goals").select("goal_id", "user_email", "title", "description", "date", "id_importance", "difficulty").where({ user_email }).orderBy("id_importance");
};

const _getGoalById = (goal_id) => {
    return db("goals").select("goal_id", "user_email", "title", "description", "date", "id_importance", "difficulty").where({ goal_id });
};

const _insertGoal = ({ user_email, title, description, date, id_importance, difficulty }) => {
    return db("goals").insert({ user_email, title, description, date, id_importance, difficulty }, ["user_email", "title", "description", "date", "id_importance", "difficulty"]);
};

const _editGoal = ({ title, description, date, id_importance }, goal_id) => {
    return db("goals")
        .update({ title, description, date, id_importance, difficulty })
        .where({ goal_id })
        .returning(["goal_id", "title", "description", "date", "importance", "difficulty"]);
};

const _deleteGoal = (goal_id) => {
    return db("goals").where({ goal_id }).del().returning(["goal_id", "title", "description"]);
};

module.exports = {
    _getAllGoals,
    _getGoalById,
    _insertGoal,
    _editGoal,
    _deleteGoal,
};