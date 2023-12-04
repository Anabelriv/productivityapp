const {
    _getAllGoalsDB,
    _insertGoalDB,
    _editGoalDB,
    _deleteGoal,
} = require("../models/goals.model.js");

//get all goals
const getAllGoals = async (req, res) => {
    const { userEmail } = req.params
    try {
        const goals = await (_getAllGoalsDB(), userEmail);
        res.json(goals)
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

//create goal
const createGoal = async (req, res) => {
    const { user_email, title, description, date, id_importance, difficulty } = req.body
    // Validate request body
    if (!user_email || !title || !description || !date || !id_importance || !difficulty) {
        return res.status(400).json({ error: 'Incomplete data in the request body' });
    }
    try {
        const [newGoal] = await _insertGoalDB(req.body);
        res.status(201).json(newGoal);
        getAllGoals(req, res);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error.message });
    }
};


// update goal
const updateGoal = async (req, res) => {
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

// delete goal
const deleteGoal = async (req, res) => {
    const { goal_id } = req.params;
    try {
        const data = await _deleteGoal(goal_id);
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