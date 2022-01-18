const Reservation = require('../models/reservation');
const Vehicule = require('../models/vehicule');
const Contract = require('../models/contract');

module.exports = {

    consultContract: async (req,res,next)=>{    //! this one to modify and delete also

        try {
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            const contractID = req.params.id;
            const contract = await Contract.findById(contractID);
            await res.render('contract',{title:'Contract' , contract ,infoErrorObj, infoSubmitObj})
        } catch (e) {
            res.json({error: e.message});
        }

    },

    showContract: async(req, res, next)=>{
        try {
           
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            await res.render('contracts',{title: 'Contracts', infoErrorObj, infoSubmitObj});

        } catch (e) {
             res.json(e);
        }
        
    },

    addContract: async (req,res,next)=>{

        try {
            const C = await Contract.create({
                contractID: req.body.contractID,
                realStartingDate: req.body.realStartingDate,
                kilometrage: req.body.kilometrage,
                matricule: req.body.Matricule,
                driverLicenceNumber: req.body.driverLicenceNumber,
            })
            req.flash('infoSubmit','Contract Has Been Added');
            res.redirect('/contracts');
        } catch (e) {
            res.json(e);
            req.flash('infoErrors','e');
            res.redirect('/contracts');
        }

    },

    modifyContract: async(req,res,next)=>{
        
        try {
            id = req.params.id;
            const C = await Contract.findById(id);

            C.contractID = req.body.contractID ? req.body.contractID : C.contractID;
            C.realStartingDate = req.body.realStartingDate ? req.body.realStartingDate : C.realStartingDate;
            C.kilometrage = req.body.kilometrage ? req.body.kilometrage : C.kilometrage;
            C.matricule = req.body.Matricule ? req.body.Matricule : C.matricule;
            C.driverLicenceNumber = req.body.driverLicenceNumber ? req.body.driverLicenceNumber : C.driverLicenceNumber;

            await C.save(); 
            req.flash('infoSubmit','Contract  Has Been Updated!');
            next();
        } catch (e) {
            req.flash('infoErrors','e');
            res.json(e)
            next();
        }
    },


    searchContract: async (req, res, next)=>{
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
        try {
            let searchcontract  = req.body.searchreservation;
            let contract = await Contract.find({resID: searchcontract})
            res.render('searchContract', {title: 'Contract', contract,infoErrorObj,
            infoSubmitObj});
            next()
        } catch (e) {
            res.json({error: e.message});
            req.flash('infoErrors','e');
            next()
        }

    }

}