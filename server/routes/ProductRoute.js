import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', authSeller, upload.array("images"), addProduct);
productRouter.get('/list', productList)
productRouter.get('/id', productById)
productRouter.post('/toggleStock', authSeller, changeStock)

export default productRouter;