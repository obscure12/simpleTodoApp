const express = require('express');
const mongoose = require('mongoose');
const databaseUrl = process.env.MONGO_DATABASE || "mongodb://localhost/myapp"
const bodyParser = require('body-parser');

const todos = require('./routes/todos');

mongoose.connect(databaseUrl);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// routes
app.use('/api/todos', todos);


app.listen(3000);