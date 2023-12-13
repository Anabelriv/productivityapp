const PORT = process.env.PORT ?? 8000

const express = require('express') //correct
const app = express()
const cors = require('cors') //correct
const cookieParser = require('cookie-parser'); //correct
const dotenv = require("dotenv").config(); //new
const path = require("path"); //new
const { spawn } = require('child_process'); //correct
const fs = require('fs').promises; //correct
const { verifyToken } = require("./middlewares/verifyToken.js") // correct




// import routes
const { user_router } = require("./routes/users.router");
const { goal_router } = require("./routes/goals.router.js")

app.use(cors({ credentials: true, origin: 'http://localhost:3000' })) // correct
app.use(express.json());//correct
app.use(cookieParser()); //correct
app.use(express.urlencoded({ limit: '50mb', extended: true })); //new


//App main routes
app.use("/", user_router);//new
app.use("/todos", goal_router);


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
    const pythonProcess = spawn(pythonExecutablePath, ['/Users/anabelrivera/Desktop/Bootcamp/productivityapp/backend/components/pulpy.py', json_file_path, freeTime]);

    // Handle the output of the Python script
    let responseSent = false;

    // Handle the output of the Python script
    pythonProcess.stdout.on('data', (data) => {
        console.log('Received data:', data.toString());

        // Extract JSON data from the output
        const jsonStartIndex = data.indexOf('{');
        const jsonEndIndex = data.lastIndexOf('}');
        const jsonSubstring = data.toString().substring(jsonStartIndex, jsonEndIndex + 1);

        try {
            // Parse the extracted JSON output from the Python script
            const selectedGoal = JSON.parse(jsonSubstring);

            // Check if the response has already been sent
            if (!responseSent) {
                // Send the response to the client
                res.json(selectedGoal);
                responseSent = true; // Set the flag to true to prevent multiple responses
            }
        } catch (error) {
            console.error(`Error parsing JSON: ${error.message}`);

            // Check if the response has already been sent
            if (!responseSent) {
                // Send an error response to the client
                res.status(500).json({ error: 'Internal Server Error' });
                responseSent = true; // Set the flag to true to prevent multiple responses
            }
        }
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);

        // Check if the response has already been sent
        if (!responseSent) {
            // Send an error response to the client
            res.status(500).json({ error: 'Internal Server Error' });
            responseSent = true; // Set the flag to true to prevent multiple responses
        }
    });
});
//app listen
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))



// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.use(express.static(path.join(__dirname, "client/build")));

// // All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });