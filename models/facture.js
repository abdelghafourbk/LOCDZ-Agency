const mongoose = require('mongoose');

let factureSchema = new mongoose.Schema({

    factureID:{
        type: Number,
        unique: true,
        required: true
    },
    contractID:{
        type: Number,
        unique: true,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    matricule:{
        type: String,
        unique:true,
        required: true
    },
    traveledDistance:{
        type: Number,
        required: true
    },
    driverLicenceNumber:{
        type: Number,
        unique: true,
        required: true
    },
    price:{
        type: Number,
        required: true
    }

});
module.exports = mongoose.model('facture', factureSchema);
