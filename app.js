import express from 'express'
// const mongoose = require('mongoose');
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js';
import dotenv from 'dotenv';
dotenv.config()

console.log('DATABASE_NAME',process.env.DATABASE_NAME);

// console.log('customerroutes',customerRoutes);


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/customerManagement', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

import { testConnectionMySQL } from './controllers/customerController.js';

testConnectionMySQL()

// Sample route for testing
app.get('/test', (req, res) => {
  res.send("This is test data");
});

// Use customer routes
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
