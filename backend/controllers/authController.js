const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// SIGNUP
exports.signup = async (req, res) => {

    try {

        let { name, email, password, role } = req.body;

        // Normalization email - email must be in lowercase
        email = email.toLowerCase().trim();

    
        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });

        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name: name.trim(),
            email,
            password: hashedPassword,
            role
        });

        // Response
        return res.status(201).json({
            success: true,
            message: 'Signup successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });

    }

};


// LOGIN
exports.login = async (req, res) => {

    try {

        let { email, password } = req.body;

        // Normalization email - email must be in lowercase
        email = email.toLowerCase().trim();
    

        // Find User
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: 'User not found'
            });

        }

        // Compare Password
        const isMatch = await bcrypt.compare(
            password, 
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });

        }

        // JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        // Login Response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });

    }

};