const validate = (schema) => async (req, res, next) => {

    try {
        await schema.parseAsync(req.body);
        next();

    } catch ( error ) {

        if (error.issues) {

            return res.status(400).json({
                success: false, 
                message: 'Validation Error',
                errors: error.issues.map((err) => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }

        return res.status(500).json({
            success: false, 
            message: 'Internal Server Error'
        });
    }
};

module.exports = validate;