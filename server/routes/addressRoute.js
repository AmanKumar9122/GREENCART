
import express from 'express';
import authUser from '../middlewares/authUser.js';
import { addAddress, getAddress } from '../controllers/addressController.js';

const addressRouter = express.Router();

addressRouter.post('/', authUser, addAddress)
addressRouter.get('/', authUser, getAddress)

export default addressRouter;