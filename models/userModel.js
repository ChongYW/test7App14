const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserName: { type: String, required: true },
    Password: { type: String, required: true },
    Phone: { type: String },
    Email: { type: String },
    Role: { type: String },
    Status: { type: String },
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;