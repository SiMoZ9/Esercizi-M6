const express = require('express');
const mongoose = require('mongoose');
const authorsRoute = require('./routes/authors');

require('dotenv').config()
const PORT = 5050;
const server = express();

server.use(express.json())
server.use('/', authorsRoute)

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error during db connection'))
db.once('open', () => {
    console.log('Database successfully connected!')
})

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}` )
});