const mongoose = require('mongoose');
//resID, StartingDate, Duration, matricule, firstNAme, last name,
// driver licence, adress, date of birsth, place of birth
let reservationSchema = new mongoose.Schema({

    resID:{
        type: Number,
        unique: true,
        required: true
    },

    StartingDate:{
        type: Date,
        required: true
    },
    Duration:{
        type: Number,
        required: true
    },
    matricule:{
        type: String,
        unique:true,
        required: true
    },
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

module.exports = mongoose.model('reservation',reservationSchema);