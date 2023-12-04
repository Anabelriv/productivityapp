const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

//
const cookieParser = require("cookie-parser");
// 
const { auth } = require("./middlewares/utils.js");
const { goal_router } = require("./routes/goals.router.js");
const { user_router } = require("./routes/users.router.js");
const { error } = require("console");

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(cookieParser());
// app.use(logger);
// app.use("/api/users", auth);

app.listen(process.env.PORT || 8000, () => {
    console.log(`run on port ${process.env.PORT || 8000}`);
});


app.use("/api/goals", goal_router);
app.use("/api/users", user_router);


// // Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "/client/build")));

// // All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});