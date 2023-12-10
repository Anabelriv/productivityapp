const {
    _getAllGoalsDB,
    _insertGoalDB,
    _editGoalDB,
    _deleteGoalDB
} = require("../models/goals.model.js");

// Get all goals
const getAllGoals = async (req, res) => {
    //const userEmail = "blue@test.com";

    const { userEmail } = req.params;
    try {
        const goals = await _getAllGoalsDB(userEmail);
        res.json(goals);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Create goal
const createGoal = async (req, res) => {
    const { user_email, title, description, date, id_importance, difficulty } = req.body;
    // Validate request body
    if (!user_email || !title || !description || !date || !id_importance || !difficulty) {
        return res.status(400).json({ error: 'Incomplete data in the request body' });
    }
    try {
        const newGoal = await _insertGoalDB(req.body);
        res.status(201).json(newGoal);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error.message });
    }
};

// Update goal
const updateGoal = async (req, res) => {
    //const goal_id = "29"
    const { goal_id } = req.params;
    const { user_email, title, description, date, id_importance, difficulty } = req.body;

    try {
        const updatedGoal = await _editGoalDB(
            {
                user_email,
                title,
                description,
                date,
                id_importance,
                difficulty,
            },
            goal_id
        );

        res.status(200).json(updatedGoal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete goal
const deleteGoal = async (req, res) => {
    //const goal_id = "30"
    const { goal_id } = req.params;
    try {
        const data = await _deleteGoalDB(goal_id);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error.message });
    }
};

module.exports = {
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal,
};
