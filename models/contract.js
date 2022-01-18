const mongoose = require('mongoose');

let contractSchema = new mongoose.Schema({
    contractID:{
        type: Number,
        unique: true,
        required: true
    },
    realStartingDate:{
        type: Date,
        required: true
    },
    kilometrage:{
        type: Number,
        required: true
    },
    matricule:{
        type: String,
        unique:true,
        required: true
    },
    driverLicenceNumber:{
        type: Number,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('contract', contractSchema);