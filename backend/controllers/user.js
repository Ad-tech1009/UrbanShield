import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

// Signup Controller
export const handlesignup = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Allowed roles
        const allowedRoles = ["admin", "police", "society_owner", "guard", "resident"];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role specified" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, phone, role });
        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Store token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set `true` in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
       console.log(token);
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Pending request
// export const handleRequest = async (req, res) => {
//     // Get all pending requests
//     if(req.method === "GET"){
//         try {
//             const users = await User.find({ status: "pending" });
//             res.status(200).json(users);
//         } catch (error) {
//             console.error("Pending Request Error:", error.message);
//             res.status(500).json({ message: "Server error", error: error.message });
//         }
//     }
//     // Approve or Reject request
//     else if(req.method === "PUT"){
//         try {
//             const user = await User.findById(req.body.id);
//             user.status = req.body.status;
//             await user.save();
//             res.status(200).json({ message: "Request updated successfully" });
//         } catch (error) {
//             console.error("Update Request Error:", error.message);
//             res.status(500).json({ message: "Server error", error: error.message });
//         }
//     }
// };


// Login Controller
export const handlelogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(403).json({ message: "Your account is inactive. Contact support." });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        console.log(token);
        // Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Allow credentials in CORS
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*"); 
        res.setHeader("Access-Control-Allow-Credentials", "true");

       

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Logout Controller
export const logout = (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
};

