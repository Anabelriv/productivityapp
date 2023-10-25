const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
//
const cookieParser = require("cookie-parser");
//
const { auth } = require("./middlewares/utils.js");
const { p_router } = require("./routes/goals.router.js");
const { u_router } = require("./routes/users.router.js");

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(cookieParser());
// app.use(logger);
// app.use("/api/users", auth);

app.listen(process.env.PORT, () => {
    console.log(`run on port ${process.env.PORT}`);
});

app.use("/api/goals", p_router);
app.use("/api/users", u_router);


// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "/client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});