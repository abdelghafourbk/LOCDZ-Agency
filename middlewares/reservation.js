const Reservation = require('../models/reservation');
const Vehicule = require('../models/vehicule');

module.exports = {


    consultReservation: async (req,res,next)=>{    //! this one to modify and delete also

        try {
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            const reservationID = req.params.id;
            const reservation = await Reservation.findById(reservationID);
            const vehicule = await Vehicule.find({matricule: reservation.matricule});
            await res.render('reservation',{title:'Reservation' , reservation,vehicule ,infoErrorObj, infoSubmitObj})
        } catch (e) {
            res.json({error: e.message});
        }

    },

    showReservation: async(req, res, next)=>{
        try {
           
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            await res.render('reservations',{title: 'Reservations', infoErrorObj, infoSubmitObj});

        } catch (e) {
             res.json(e);
        }
        
    },

    addReservation: async (req,res,next)=>{

        try {
            const R = await Reservation.create({
                resID: req.body.resID,
                StartingDate: req.body.startingdate,
                Duration: req.body.duration,
                matricule: req.body.Matricule,
                firstName: req.body.clientFirstName,
                lastName: req.body.clientLastName,
                driverLicenceNumber: req.body.driverLicenceNumber,
                adress: req.body.adress,
                dateOfBirth: req.body.dateofbirth,
                placeOfBirth: req.body.placeofbirth
            })
            req.flash('infoSubmit','Reservation Has Been Added');
            res.redirect('/reservations');
        } catch (e) {
            res.json(e);
            req.flash('infoErrors','e');
            res.redirect('/reservations');
        }

    },

    modifyReservation: async(req,res,next)=>{
        
        try {
            id = req.params.id;
            const R = await Reservation.findById(id);

            R.resID = req.body.resID ? req.body.resID : R.resID;
            R.StartingDate = req.body.startingdate ? req.body.startingdate : R.StartingDate;
            R.Duration = req.body.duration ? req.body.duration : R.Duration;
            R.matricule = req.body.Matricule ? req.body.Matricule : R.matricule;
            R.firstName = req.body.clientFirstName ? req.body.clientFirstName : R.firstName;
            R.lastName = req.body.clientLastName ? req.body.clientLastName : R.lastName;
            R.driverLicenceNumber = req.body.driverLicenceNumber ? req.body.driverLicenceNumber : R.driverLicenceNumber;
            R.adress = req.body.adress ? req.body.adress : R.adress;
            R.dateOfBirth = req.body.dateofbirth ? req.body.dateofbirth : R.dateOfBirth;
            R.placeOfBirth = req.body.placeofbirth ? req.body.placeofbirth : R.placeOfBirth;

            await R.save(); 
            req.flash('infoSubmit','Reservation  Has Been Updated!');
            next();
        } catch (e) {
            req.flash('infoErrors','e');
            res.json(e)
            next();
        }
    },


    searchReservation: async (req, res, next)=>{
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
        try {
            let searchreservation  = req.body.searchreservation;
            let reservation = await Reservation.find({resID: searchreservation})
            let vehicule = await Vehicule.find({matricule: reservation[0].matricule})
            res.render('searchReservation', {title: 'Reservation', reservation, vehicule,infoErrorObj,
            infoSubmitObj});
            next()
        } catch (e) {
            res.json({error: e.message});
            req.flash('infoErrors','e');
            next()
        }

    }

}