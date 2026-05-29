const jwt = require('jsonwebtoken');

// protect routes by verifying JWT token
exports.auth = async (req, res, next) => {
    try {
        // Extract the Authorization header from the incoming request
        const authHeader = req.header('Authorization');
        
        // no token provided
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token missing'
            });
        }

        // token must start with "Bearer "
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false, 
                message: 'Invalid token format'
            });
        }
        
        // remove "Bearer " and get the actual token
        const token = authHeader.split(' ')[1];

        // verify token with secret key
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );

        // attach user data to request for next middleware
        req.user = decoded;
        next();

    } catch (error) {
        // token is invalid or expired
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};