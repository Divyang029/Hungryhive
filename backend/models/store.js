const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const storeSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    store_name: { type: String, required: true},
    description: { type: String},
    store_address: {
        house_no: { type: Number, required: true },
        street: { type: String},
        area: { type: String, required: true},
        pincode: { type: Number, required: true, validate: {
            validator: function(value) {
              return /^[0-9]{6}$/.test(value);  // Ensures exactly 6 digits
            },
            message: 'Pincode must be exactly 6 digits'
        }},
        city: { type: String, required: true},
        state: { type: String, required: true },
        country: { type: String, required: true },
    },

    menu:[
        {
            item_photo:{ type: String },
            item_name: { type: String, required: true},
            item_price: { type: Number, required: true},
            item_quantity: { type: Number, required: true},
            item_description: { type: String},
            item_type: { type: String, required: true},
            item_category: { type: String, required: true}
        }
    ]

});

storeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Store', storeSchema);


