const User = require('../../models/userModel');
const validator = require('validator');
// const flash = require('express-flash');

const createUserPage = (req, res) => {
    res.render('admin/createUser');
}

const createUser = async (req, res) => {

    let isValid = true;
    
    const {
        username,
        password,
        phone,
        email,
        role,
        status
    } = req.body;

    if (!validator.isAlphanumeric(username) || !validator.isLength(username, {min:3, max:20})) {
        isValid = false;
        req.flash('error', 'Invalid username');
    }
    
    if (!validator.isLength(password, {min:6})) {
        isValid = false;
        req.flash('error', 'Password must be at least 6 characters long');
    }

    if (!validator.isMobilePhone(phone, 'any', {strictMode: false})) {
        isValid = false;
        req.flash('error', 'Invalid phone number');
    }

    if (!validator.isEmail(email)) {
        isValid = false;
        req.flash('error', 'Invalid email');
    }

    if (!validator.isLength(role, {max: '20'})) {
        isValid = false;
        req.flash('error', 'Invalid role');
    }

    const allowedStatusValue = ['active', 'inactive', 'pending', 'blacklist']
    if (!allowedStatusValue.includes(status)) {
        isValid = false;
        req.flash('error', 'Invalid status');
    }

    const userAvailable = await User.findOne({Email: email.trim()});
    if (!userAvailable && isValid) {
        try {
            const newUser = await User.create({
                UserName: username,
                Password: password,
                Phone: phone,
                Email: email,
                Role: role,
                Status: status
            });
    
            return res.status(201).render('index', { title: 'Create user success!', newUser });
        } catch (error) {
    
            console.error('Error creating user:', error);
            req.flash('error', 'Error creating user');
            return res.render('admin/createUser', {
                username,
                password,
                phone,
                email,
                role,
                status
            });
        }
    }else if(userAvailable && isValid){

        req.flash('error', 'Email already registered');
        return res.render('admin/createUser', {
            username,
            password,
            phone,
            email,
            role,
            status
        });

    }else{

        return res.render('admin/createUser', {
            username,
            password,
            phone,
            email,
            role,
            status
        });
        
    }
}

module.exports = {
    createUserPage,
    createUser,
}