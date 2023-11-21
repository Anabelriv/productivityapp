const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const { db } = require('./config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json());

//get all goals
app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    try {
        const todos = await db.select('*').from('goals').where('user_email', '=', userEmail);
        res.json(todos)
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

// create a new goal

app.post('/todos', async (req, res) => {
    const { user_email, title, description, date, id_importance, difficulty } = req.body
    console.log(user_email, title, description, date, id_importance, difficulty)
    // Validate request body
    if (!user_email || !title || !description || !date || !id_importance || !difficulty) {
        return res.status(400).json({ error: 'Incomplete data in the request body' });
    }

    try {
        const [newGoal] = await db("goals").insert(
            { user_email, title, description, date, id_importance, difficulty },
            ["user_email", "title", "description", "date", "id_importance", "difficulty"]
        );
        res.status(201).json(newGoal);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})
// update goal
app.put('/todos/:goal_id', async (req, res) => {
    const { goal_id } = req.params;
    const { user_email, title, description, date, id_importance, difficulty } = req.body;

    try {
        const updatedGoals = await editGoal({
            user_email,
            title,
            description,
            date,
            id_importance,
            difficulty
        }, goal_id);

        res.status(200).json(updatedGoals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define the editGoal function outside of the route handler
const editGoal = async ({ user_email, title, description, date, id_importance, difficulty }, goal_id) => {
    try {
        const updatedGoals = await db("goals")
            .update({ user_email, title, description, date, id_importance, difficulty })
            .where({ goal_id })
            .returning(["goal_id", "user_email", "title", "description", "date", "id_importance", "difficulty"]);

        return updatedGoals;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// delete goal
app.delete('/todos/:goal_id', async (req, res) => {
    const { goal_id } = req.params
    try {
        const deleteGoal = await db("goals").
            where({ goal_id })
            .del()
            .returning(["goal_id", "title", "description"]);
        return deleteGoal

    } catch (err) {
        console.error(err);
    }
})


//sign up
app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const [newUser] = await db("users")
            .insert({ user_email: email, password: hashedPassword })
            .returning(["id", "user_email"]);
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
        res.json({ email: newUser.user_email, token });

    } catch (err) {
        console.error(err)
        //res.status(500).json({ error: "Internal Server Error" });
        if (err) {
            res.json({ detail: err.detail })
        }
    }
})

//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const users = await db.select('*').from('users').where('user_email', '=', email);
        if (!users.rows.length)
            return res.status(401).json({ detail: "User does not exist!" });
        const success = await bcrypt.compare(password, users.rows[0].password)
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
        if (success) {
            res.json({ token, email: users.rows[0].email });
        } else {
            res.json({ detail: "login failed" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ detail: "Internal Server Error" });
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))