export const authenticate = (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};


// Authorization Middleware
export const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
