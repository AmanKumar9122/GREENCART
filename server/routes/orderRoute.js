import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';


const orderRouter = express.Router();
orderRouter.post('/cod', authUser, placeOrderCOD); // Place Order COD
orderRouter.get('/user', authUser, getUserOrders); // Assuming you want to use the same function for user orders
orderRouter.get('/seller', authSeller, getAllOrders); // Assuming you want to use the same function for seller orders
orderRouter.post('/stripe', authUser, placeOrderStripe); // Place Order with Stripe

export default orderRouter;