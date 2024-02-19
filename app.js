const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const connectDB = require("./DB/config/mongoDB")
dotenv.config();

app.use(cors());


//port initialize
const PORT = process.env.PORT || 3001;

// Tasks Routes Modules
const allTasksRouteModules = require("./api/routes/tasks")
const allTasksRoutes = allTasksRouteModules.allTasksRoutes

const allUsersRouteModules = require("./api/routes/users")
const allUsersRoutes = allUsersRouteModules.allUsersRoutes

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);

allTasksRoutes.map(routeObj => app.use(`/api${routeObj.startPath}`, routeObj.file()))
allUsersRoutes.map(routeObj => app.use(`/api${routeObj.startPath}`, routeObj.file()))


app.listen(PORT, () => {
    console.log("Server is up and running at port ---- -", PORT);
});

connectDB() // MongoDB atlas

module.exports = app