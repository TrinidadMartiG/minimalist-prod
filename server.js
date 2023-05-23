const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRoutes = require('./server/routes/tasksRoutes'); // replace with the path to your tasks routes
const dotenv = require('dotenv')

require('dotenv').config();

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', require('./server/routes/users.js'));

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB successfully!");
});

app.get('/', (req, res) => {
  res.send("Hello, Server's up!");
});

app.use('/api/tasks', tasksRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
