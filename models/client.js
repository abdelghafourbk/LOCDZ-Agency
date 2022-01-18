const mongoose = require('mongoose');

let clientSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    driverLicenceNumber:{
        type: Number,
        unique: true,
        required: true
    },
    adress:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    placeOfBirth:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('client', clientSchema);