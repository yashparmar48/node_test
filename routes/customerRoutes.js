import express from 'express';
import { addCustomer, fetchCustomerById, getCustomers,removeCustomer,updateCustomer } from '../controllers/customerController.js'; // Import function properly

const router = express.Router();

router.post('/addCustomer', addCustomer); // Attach the function to handle requests

// Uncomment these if you implement them later
// router.get('/getCustomers', getCustomers);
router.get("/getCustomers", getCustomers);
router.get('/:id', fetchCustomerById);
router.put('/updateCustomer/:id', updateCustomer);
router.post('/removeCustomer/:id', removeCustomer);

export default router; // Use ES6 export instead of `module.exports`
