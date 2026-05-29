const { z } = require('zod');

// check validation for signup
const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name too long'),

    email: z
        .string()
        .trim()
        .email('Invalid email format')
        .toLowerCase(),

    password: z
        .string()
        .min(8, 'Password must be at least 8 charcaters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%&])/,
            'Password must contain uppercase, lowercase, number and special character'
        ),

    role: z
        .enum(['user', 'admin', 'shop_owner'])
        .optional()
});

// check validation for login
const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email('Invalid email format')
        .toLowerCase(),

    password: z
        .string()
        .min(1, 'Password is required')
});

module.exports = {
    signupSchema,
    loginSchema
};

