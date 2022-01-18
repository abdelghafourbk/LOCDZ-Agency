const mongoose = require('mongoose');

let vehiculeSchema = new mongoose.Schema({
    matricule:{
        type: String,
        unique:true,
        required: true

    },
    name:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
        enum:["Touristic", "SuperCar", "PickupTruck", "Truck", "MiniBus"]
    },
    rentalRate:{
        type: Number,
        required: true
    },
    isAvailable:{
        type: Boolean,
        default: false
    },
    kilometrage:{
        type: Number,
        required: true
    },
    carImage:{
        type: String
    }
})
vehiculeSchema.index({name: 'text', model: 'text'});


module.exports = mongoose.model("vehicule",vehiculeSchema);