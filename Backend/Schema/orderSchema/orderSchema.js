const mongoose = require('mongoose');
const orderDetailsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    orderId:{
        type: String,
        required: true,
    },
    dateTime:{
        type: String,
        required: true,
    },
    storeInfo:{
        type: Object,
        required: true,
    },
    // userAddress: {
    //     type: String,
    //     required: true
    // },
    status:{
        type: String,
        required: true,
    },
    items:{
        type : Array,
        required: true,
    },
    price:{
        type: Number,
        required: true
    }

})

const orderDetails = mongoose.model('orders', orderDetailsSchema)

module.exports = orderDetails;