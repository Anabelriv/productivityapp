const { db } = require("../config/db");

const _getAllGoalsDB = async (userEmail) => {
    try {
        const todos = await db.select('*')
            .from('goals')
            .where('user_email', '=', userEmail)
            .orderBy('date', 'asc');
        return todos;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const _insertGoalDB = async ({ user_email, title, description, date, id_importance, difficulty }) => {
    if (!user_email || !title || !description || !date || !id_importance || !difficulty) {
        throw new Error('Incomplete data in the request body. Please provide all required fields.');
    }
    try {
        const newGoal = await db("goals").insert(
            { user_email, title, description, date, id_importance, difficulty },
            ["user_email", "title", "description", "date", "id_importance", "difficulty"]
        );
        return newGoal;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const _editGoalDB = async ({ user_email, title, description, date, id_importance, difficulty }, goal_id) => {
    try {
        const updatedGoal = await db('goals')
            .update({ user_email, title, description, date, id_importance, difficulty })
            .where({ goal_id })
            .returning(['goal_id', 'user_email', 'title', 'description', 'date', 'id_importance', 'difficulty']);

        return updatedGoal;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const _deleteGoalDB = async (goal_id) => {
    try {
        const deletedGoal = await db("goals").where({ goal_id }).del().returning(["goal_id", "title", "description"]);
        return deletedGoal;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    _getAllGoalsDB,
    _insertGoalDB,
    _editGoalDB,
    _deleteGoalDB,
};
