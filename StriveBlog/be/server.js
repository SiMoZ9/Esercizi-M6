const express = require('express');
const mongoose = require('mongoose');
const authorsRoute = require('./routes/authors');
const postsRoute = require('./routes/posts')
const cors = require('cors')

require('dotenv').config()
const PORT = 5050;
const server = express();

server.use(cors())
server.use(express.json())
server.use('/', authorsRoute)
server.use('/', postsRoute)

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