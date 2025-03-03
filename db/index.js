import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config()

// Create a connection pool to MySQL
const pool = mysql.createPool({
    host: process.env.HOST_NAME,    // Replace with your MySQL host
    user: process.env.DB_USER,         // Replace with your MySQL username
    password: process.env.PASSWORD,         // Replace with your MySQL password
    database: process.env.DATABASE_NAME,// Replace with your MySQL database name
});

export default pool;
