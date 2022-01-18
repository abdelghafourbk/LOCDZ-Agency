const Reservation = require('../models/reservation');
const Vehicule = require('../models/vehicule');
const Contract = require('../models/contract');
const Facture = require('../models/facture');

module.exports = {

    consultFacture: async (req,res,next)=>{    //! this one to modify and delete also

        try {
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            const factureID = req.params.id;
            const facture = await Facture.findById(factureID);
            await res.render('facture',{title:'Facture' , facture ,infoErrorObj, infoSubmitObj})
        } catch (e) {
            res.json({error: e.message});
        }

    },


    showFacture: async(req, res, next)=>{
        try {
           
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            await res.render('factures',{title: 'Factures', infoErrorObj, infoSubmitObj});

        } catch (e) {
             res.json(e);
        }
        
    },

    addFacture: async (req,res,next)=>{

        let v = await Vehicule.find({matricule: req.body.Matricule});    
        console.log(v);
        
        let Price =  (10*Number(req.body.kilometrage)) + (Number(req.body.duration)*Number(v[0].rentalRate));
        try {
            const F = await Facture.create({
                factureID: req.body.factureID,
                contractID: req.body.contractID,
                duration: req.body.duration,
                matricule: req.body.Matricule,
                traveledDistance: req.body.kilometrage,
                driverLicenceNumber: req.body.driverLicenceNumber,
                price: Price
                //price: req.body.price,
            })
            console.log('here');
            req.flash('infoSubmit','Facture Has Been Added');
            res.redirect('/factures');
        } catch (e) {
            console.log('i mean here');
            res.json(e);
            req.flash('infoErrors','e');
            res.redirect('/factures');
        }
    },
    modifyFacture: async(req,res,next)=>{
        let v = await Vehicule.find({matricule: req.body.Matricule});    
        
        let Price =  (10*Number(req.body.kilometrage)) + (Number(req.body.duration)*Number(v[0].rentalRate));
        try {
            id = req.params.id;
            const F = await Facture.findById(id);

            F.factureID = req.body.factureID ? req.body.factureID : F.factureID;
            F.contractID = req.body.contractID ? req.body.contractID : F.contractID;
            F.duration = req.body.duration ? req.body.duration : F.duration;
            F.matricule = req.body.Matricule ? req.body.Matricule : F.matricule;
            F.traveledDistance = req.body.kilometrage ? req.body.kilometrage : F.traveledDistance;
            F.driverLicenceNumber = req.body.driverLicenceNumber ? req.body.driverLicenceNumber : F.driverLicenceNumber;
            F.price = Price;

            await F.save(); 
            req.flash('infoSubmit','Facture  Has Been Updated!');
            next();
        } catch (e) {
            req.flash('infoErrors','e');
            res.json(e)
            next();
        }
    },
    searchFacture: async (req, res, next)=>{
        const infoErrorObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');
    try {
        let searchfacture  = req.body.searchfacture;
        let facture = await Facture.find({factureID: searchfacture})
        res.render('searchFacture', {title: 'Facture', facture,infoErrorObj,
        infoSubmitObj});
        next()
    } catch (e) {
        res.json({error: e.message});
        req.flash('infoErrors','e');
        next()
    }

}


}