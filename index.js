require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const publicFolderPath = path.join(__dirname, 'public');
const homePageFilePath = path.join(__dirname, 'public', 'index.html');

// Set static folder
app.use(express.static(publicFolderPath));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
