require('dotenv').config();
const express = require('express');
const router = express.Router();
const Admin = require('../../models/AdminSchema');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;



router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blanck').isLength({ min: 5 })
], async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ success: false, error: 'Please try to login with correct credential' });
        }
        const passwordCompare = await bcrypt.compare(password, admin.password);
        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: 'Please try to login with correct credential' });
        }

        const data = {
            admin: {
                id: admin.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send(success + "Internal server error");

    }

});



module.exports = router;