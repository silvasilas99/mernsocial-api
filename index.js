const express = require('express');
const app = express();
const port = 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server is running on port port ${port}!`))