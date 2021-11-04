//jshint esversion: 6
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

let corsOption = {
    origin: "localhost:8081"
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");

db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() => {
//         console.log("Drop, roll and re-sync db.");
//     });
    
app.get("/", (req, res) => {
    res.json({message: "Welcome to Ahmad's application!"});
});

require("./app/routes/turorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is currently active on port ${PORT}`);
});

// console.log(PORT);