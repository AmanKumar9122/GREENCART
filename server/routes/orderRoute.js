import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';


const orderRouter = express.Router();
orderRouter.post('/cod', authUser, placeOrderCOD); // Place Order COD
orderRouter.post('/user', authUser, getUserOrders); // Assuming you want to use the same function for user orders
orderRouter.post('/seller', authSeller, getAllOrders); // Assuming you want to use the same function for seller orders

export default orderRouter;