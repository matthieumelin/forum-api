const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database.config');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Focus Evolution Shopping API");
});

app.use('/api/v1/users', require('./src/routes/user.routes'));

app.listen(3030, async() => {
    try {
        console.clear();
        await sequelize.authenticate();
        console.log("API started on port 3030.");
    } catch (error) {
        console.error("Unable to connet to the database: ", error);
    }
})