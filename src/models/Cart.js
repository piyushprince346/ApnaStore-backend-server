const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            // price: {
            //     // price is also required because in future there can be variation in price
            //     type: Number,
            //     required: true
            // }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);