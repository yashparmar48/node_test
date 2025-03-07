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


export const getCustomers = async (req, res) => {
  try {
    pool.query("SELECT * FROM tbl_customers", (error, results) => {
      if (error) {
        console.error("Error fetching customers:", error);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ customers: results });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const removeCustomer = async (req, res) => {
  console.log('removeCustomer',req.params);
  
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    pool.query(
      "DELETE FROM tbl_customers WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          console.error("Error deleting customer:", error);
          return res.status(500).json({ message: "Database error" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer removed successfully" });
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id || (!name && !email)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the customer exists
    pool.query("SELECT * FROM tbl_customers WHERE id = ?", [id], (error, results) => {
      if (error) {
        console.error("Error fetching customer:", error);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Update query
      pool.query(
        "UPDATE tbl_customers SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?",
        [name, email, id],
        (updateError, updateResults) => {
          if (updateError) {
            console.error("Error updating customer:", updateError);
            return res.status(500).json({ message: "Database error" });
          }

          res.status(200).json({ message: "Customer updated successfully" });
        }
      );
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const fetchCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    pool.query(
      "SELECT * FROM tbl_customers WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          console.error("Error fetching customer:", error);
          return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ customer: results[0] });
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
