const express = require('express');
const cors = require("cors");
const path = require('path');

// intializations
const app = express();
require('./database');

// settings
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5000);

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use("/", require('./routes/index.js'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


module.exports = app;