import express from 'express';
import { addCustomer } from '../controllers/customerController.js'; // Import function properly

const router = express.Router();

router.post('/addCustomer', addCustomer); // Attach the function to handle requests

// Uncomment these if you implement them later
// router.get('/getCustomers', getCustomers);
// router.get('/:id', getCustomerById);
// router.put('/updateCustomer/:id', updateCustomer);
// router.post('/removeCustomer/:id', removeCustomer);

export default router; // Use ES6 export instead of `module.exports`
