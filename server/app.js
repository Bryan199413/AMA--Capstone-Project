const express = require('express');
const app = express();
const userRouter = require('./Routers/user');
require('dotenv/config');
const mongoose = require('mongoose');

app.use(express.json());
app.use('/api/users',userRouter);

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("MongoDB Connection Failed"));

const port = process.env.PORT || 4001;

app.listen(port, () => {
    console.log(`App running on port ${port}!`)
});

module.exports = app;