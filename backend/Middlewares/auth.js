import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; // Check both cookies and headers

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

// Authorization Middleware
export const authorize = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
};
