import pool from "../db/index.js";

export const testConnectionMySQL = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("MySQL connection error:", err);
      return;
    }
    console.log("Connected to MySQL");
    connection.release(); // Release connection back to pool
  });
};

export const addCustomer = async (req, res) => {
  try {
    const { name, email } = req.body; // Extract data from request
    if (!name || !email ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Insert into MySQL
    pool.query(
      "INSERT INTO tbl_customers (name, email) VALUES (?, ?)",
      [name, email],
      (error, results) => {
        if (error) {
          console.error("Error inserting customer:", error);
          return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "Customer added successfully", customerId: results.insertId });
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
