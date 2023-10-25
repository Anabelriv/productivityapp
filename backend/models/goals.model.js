const { db } = require("../config/db.js");

const _getAllGoals = () => {
    return db("goals").select("id", "name", "description", "Importance", "Time").orderBy("name");
};

const _getGoalById = (id) => {
    return db("goals").select("id", "name", "description", "importance", "time").where({ id });
};

// const _searchProduct = (name) => {
//     return db.select("id", "name", "price").from('products')
//         .where({ name });
//     // return db.raw("select id, name,price from products where name like ?", [`${p}%`])
//     //   .rows;
// };
const _insertGoal = ({ name, description, importance, time }) => {
    return db("goals").insert({ name, description, importance, time }, ["id", "name", "description", "importance", "time"]);
};

const _editGoal = ({ name, description, importance, time }, id) => {
    return db("goals")
        .update({ name, description, importance, time })
        .where({ id })
        .returning(["id", "name", "description", "importance", "time"]);
};

const _deleteGoal = (id) => {
    return db("goals").where({ id }).del().returning(["id", "name", "description"]);
};

module.exports = {
    _getAllGoals,
    _getGoalById,
    _insertGoal,
    _editGoal,
    _deleteGoal,
};