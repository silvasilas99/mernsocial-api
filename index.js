const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

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
app.use('/api/posts/', postsRoute);

const port = process.env.PORT || 8800;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server is running on port port ${port}!`));