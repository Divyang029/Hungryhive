const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true ,unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phone_number: {type: Number,required: true, length: 10},
    address: {
        house_no: { type: Number, required: true },
        street: { type: String},
        area: { type: String, required: true},
        pincode: { type: Number, required: true, length:6},
        city: { type: String, required: true},
        state: { type: String, required: true },
        country: { type: String, required: true },
    },
    isAdmin: {type: Boolean,required:true}

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);


