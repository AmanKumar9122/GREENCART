import Order from "../models/Order.js"
import Product from "../models/Product.js"

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try{
        const { userId, items, address } = req.body
        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }
        // Calculate Amount Using Items
        let amount = 0;
        
        for (let item of items) {
            const product = await Product.findById(item.product);
            amount += product.offerPrice * item.quantity;
        }
        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        // Create Order
        await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: "COD",
            isPaid: true
        })

        return res.json({success:true, message: "Order Placed Successfully"})

    } catch (error){
        return res.json({success: false, message: error.message})
    }
}

// Get Orders by UserId : /api/orders/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.id
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product").sort({createdAt: -1})
        return res.json({success: true, orders})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// Get All Orders : /api/orders/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product").sort({createdAt: -1})
        return res.json({success: true, orders})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}