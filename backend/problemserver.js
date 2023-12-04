const PORT = process.env.PORT || 8000;
const express = require('express');
const cors = require('cors');
const app = express();

const { logger, auth } = require("./middlewares/utils.js");
const { goal_router } = require("./routes/goals.router.js");
const { user_router } = require("./routes/users.router.js");
const { freetime_router } = require("./routes/freetime.router.js");

app.use(cors());
app.use(express.json());

// Apply middleware globally
app.use(logger);

// import route handlers:

// Define routes with middleware as needed
app.use('/todos', auth, goal_router);
app.use('/auth', user_router);
app.use('/free-time', freetime_router);

// app listen
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
