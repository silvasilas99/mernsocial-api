const express = require('express');
const app = express();
const port = 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to MongoDB sucessfully');
});

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/user/', userRoute);
app.use('/api/auth/', authRoute);


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server is running on port port ${port}!`));