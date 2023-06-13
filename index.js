require('dotenv').config();
const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger');

const app = express();

// Init middleware
app.use(logger);

// Gets all members
app.get('/api/members', (req, res) => {
    res.json(members);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
