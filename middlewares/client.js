const Client = require('../models/client');
 
module.exports = {

    showClient: async(req, res, next)=>{

        try {
           
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            await res.render('clients',{title: 'Clients', infoErrorObj, infoSubmitObj});

        } catch (e) {
             res.json(e);
        }

    },

    addClient: async (req, res ,next)=>{
        try{
            const C = await Client.create({
                firstName: req.body.clientFirstName ,
                lastName:req.body.clientLastName ,
                driverLicenceNumber:req.body.driverLicenceNumber ,
                adress:req.body.adress ,
                dateOfBirth: req.body.dateofbirth,
                placeOfBirth: req.body.placeofbirth
            });
            req.flash('infoSubmit','Client Has Been Added');
            res.redirect('/clients');
        } catch (e) {
            res.json(e);
            req.flash('infoErrors','e');
            res.redirect('/clients');
        }


    },

    consultClient: async (req,res,next)=>{    //! this one to modify and delete also

        try {
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            const clientID = req.params.id;
            const cl = await Client.findById(clientID);
            await res.render('client',{title:'Client' , cl ,infoErrorObj, infoSubmitObj})
        } catch (e) {
            res.json({error: e.message});
        }

    },

    modifyClient: async(req,res,next)=>{
        try {
            id = req.params.id;
            const C = await Client.findById(id);

            C.firstName = req.body.clientFirstName ? req.body.clientFirstName : C.firstName;
            C.lastName = req.body.clientLastName ? req.body.clientLastName : C.lastName;
            C.driverLicenceNumber = req.body.driverLicenceNumber ? req.body.driverLicenceNumber : C.driverLicenceNumber;
            C.adress = req.body.adress ? req.body.adress : C.adress;
            C.dateOfBirth = req.body.dateofbirth ? req.body.dateofbirth : C.dateOfBirth;
            C.placeOfBirth = req.body.placeofbirth ? req.body.placeofbirth : C.placeOfBirth;
          
            await C.save(); 
            req.flash('infoSubmit','Client  Has Been Updated!');
            next();
        } catch (e) {
            req.flash('infoErrors','e');
            res.json(e)
            next();
        }
    },

    searchClient: async (req, res, next)=>{
        const infoErrorObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');
    try {
        let searchclient  = req.body.searchclient;
        let Rclient = await Client.find({driverLicenceNumber: searchclient})
       
        await res.render('searchClient', {title: 'Client', Rclient,infoErrorObj, infoSubmitObj});
        next()
    } catch (e) {
        res.json({error: e.message});
        req.flash('infoErrors','e');
        next()
    }

}



}