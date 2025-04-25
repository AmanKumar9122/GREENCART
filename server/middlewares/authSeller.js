import jwt from 'jsonwebtoken';

const authSeller = (req, res, next) => {
    const { sellerToken } = req.cookies;

    if(!sellerToken) {
        return res.json({ success: false, message: "Not Authorized" });
    }
    try {
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(decoded.email === process.env.SELLER_EMAIL) {
            next();
        }
        else{
            return res.json({ success: false, message: "Not Authorized" });
        }
    } catch (error) {
        return res.json({ success: false, message: Error });
    }
}

export default authSeller;