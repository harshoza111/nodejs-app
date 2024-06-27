const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Database configuration
const db = require('./config/db');
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRoute = require('./routes/index');
const apiRoute = require('./routes/api');
app.use('/', indexRoute);
app.use('/api', apiRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
