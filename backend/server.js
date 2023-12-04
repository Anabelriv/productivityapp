const PORT = process.env.PORT ?? 8000

const express = require('express')
const cors = require('cors')
const { db } = require('./config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const session = require("express-session");
const { spawn } = require('child_process');
const fs = require('fs').promises;

const app = express()
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'session',
        cookie: {
            maxAge: 1000 * 60 * 60,
            sameSite: "none",
            secure: false,
        },
    })
);


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
    //const { userEmail } = req.body.userEmail
    const { email, password } = req.body
    try {
        const users = await db.select('*').from('users').where('user_email', '=', email);
        console.log(users)
        if (!users.length)
            return res.status(401).json({ detail: "User does not exist!" });
        const success = await bcrypt.compare(password, users[0].password)
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
        if (success) {
            // req.session.email = userEmail;
            res.json({ 'email': users[0].email, token });
            console.log('success')
        } else {
            res.json({ detail: "login failed" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ detail: "Internal Server Error" });
    }
})


// //Free time optimization
const { spawnSync } = require('child_process');

app.post('/free-time/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    const { freeTime } = req.body;
    console.log(freeTime)

    // Fetch user's goals from the database based on userEmail
    const goals = await db.select('*').from('goals').where('user_email', '=', userEmail);
    console.log('goals', goals)
    // Convert goals to a JSON string
    const goalsJson = JSON.stringify(goals);
    console.log('goalsjson string', goalsJson)

    const json_file_path = "/Users/anabelrivera/Desktop/Bootcamp/productivityapp/backend/components/data_for_pulpy.json";

    await fs.writeFile(json_file_path, goalsJson, 'utf8');
    console.log("JSON file has been saved.");

    // Generate CSV from the goals JSON
    const generateCsvCommand = `python /Users/anabelrivera/Desktop/Bootcamp/productivityapp/backend/components/pulpy.py "${json_file_path}"`;
    console.log('Command:', generateCsvCommand);
    const result = spawnSync(generateCsvCommand, { shell: true });

    if (result.error) {
        console.error(`Error generating CSV: ${result.error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    //path to where python is stored
    const pythonExecutablePath = '/Library/Frameworks/Python.framework/Versions/3.11/bin/python3';

    // Run the Python script as a child process
    const pythonProcess = spawn(pythonExecutablePath, ['/Users/anabelrivera/Desktop/Bootcamp/productivityapp/backend/components/pulpy.py', userEmail, freeTime]);

    // Handle the output of the Python script
    pythonProcess.stdout.on('data', (data) => {
        try {
            // Parse the JSON output from the Python script
            const selectedGoal = JSON.parse(data.toString());
            // Return the selected goal to the frontend
            res.json(selectedGoal);
        } catch (error) {
            console.error(`Error parsing JSON: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

//app listen
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
