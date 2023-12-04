const express = require('express');
const { spawn, spawnSync } = require('child_process');
const { _getAllGoalsDB } = require('../models/goals.model')
const freetime_router = express.Router();
// Free time optimization

freetime_router.post('/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    const { freeTime } = req.body;

    // Fetch user's goals from the database based on userEmail
    const goals = _getAllGoalsDB;

    // Convert goals to a JSON string
    const goalsJson = JSON.stringify(goals);

    // Generate CSV from the goals JSON
    const generateCsvCommand = `python /Users/anabelrivera/Desktop/Bootcamp/productivityapp/backend/components/pulpy.py '${goalsJson}'`;
    const result = spawnSync(generateCsvCommand, { shell: true });

    if (result.error) {
        console.error(`Error generating CSV: ${result.error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Run the Python script as a child process
    const pythonProcess = spawn('python', ['/Users/anabelrivera/Desktop/Bootcamp/productivityapp/backend/components/pulpy.py', userEmail, freeTime]);

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

module.exports = freetime_router;
