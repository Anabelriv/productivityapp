const { goals } = require("../config/db.js");
const {
    _getAllGoals,
    _getGoalById,
    _insertGoal,
    _editGoal,
    _deleteGoal,
} = require("../models/goals.model.js");

const getAllGoals = (req, res) => {
    _getAllGoals()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({ msg: "not found" });
        });
};

// const searchProduct = async (req, res) => {
//   try {
//     const data = await _searchProduct(req.query.name);
//     res.json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ msg: error.message });
//   }
// };

const getGoal = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await _getGoalById(id);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "no goal match this id" });
    }
};

const createGoal = async (req, res) => {
    // const { name, price } = req.body;
    try {
        const data = await _insertGoal(req.body);
        // res.json(data);
        getAllGoals(req, res);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error.message });
    }
};

const editGoal = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const data = await _editGoal(req.body, id);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error.message });
    }
};

const deleteGoal = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await _deleteGoal(id);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error.message });
    }
};

module.exports = {
    getAllGoals,
    getGoal,
    createGoal,
    editGoal,
    deleteGoal,
};