import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        // Retrieve the token from cookies or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(403).json({
                error: true,
                message: "Access Denied: Admin is not Authenticated"
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVAT_KEY);

        // Check if the token payload has an `isAdmin` field
        if (decoded.isAdmin) {
            req.admin = decoded; // Optional: attach decoded data to req for further use
            return next();
        } else {
            return res.status(403).json({
                error: true,
                message: "Access Denied: Admin is not Authenticated"
            });
        }
    } catch (error) {
        console.error("Error in adminAuth middleware:", error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
};

export default adminAuth;
