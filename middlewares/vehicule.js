const vehicule = require('../models/vehicule');
const Vehicule = require('../models/vehicule');

module.exports ={


    showVehicule: async (req, res, next)=>{     //? this one to add
       try {
        const infoErrorObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');
        await res.render('vehicules',{title:'Car', infoErrorObj, infoSubmitObj});
       } catch (e) {
        res.json({error: e.message});
       }
       
    },
  
    consultVehicule: async (req,res,next)=>{    //! this one to modify and delete also

        try {
            const infoErrorObj = req.flash('infoErrors');
            const infoSubmitObj = req.flash('infoSubmit');
            const vehiculeID = req.params.id;
            const vehicule = await Vehicule.findById(vehiculeID);
            await res.render('vehicule',{title: vehicule.name + " " +  vehicule.model , vehicule, infoErrorObj, infoSubmitObj})
            
        } catch (e) {
            res.json({error: e.message});
        }

    },

    addVehicule: async (req,res,next)=>{
        let available = false;
       if(req.body.Available === 'on'){
            available = true
        }

        try {
            
            let imageUploadFile;
            let uploadPath;
            let newImageName;

            if(!req.files || Object.keys(req.files).length === 0){
                console.log('No Files Were Uploaded!!');
            }else{
                imageUploadFile = req.files.image;
                newImageName = Date.now()  + imageUploadFile.name;
                uploadPath = require('path').resolve('./') + '/public/assets/' + newImageName;

                imageUploadFile.mv(uploadPath, function (err) {
                    if(err) return res.status(500).send(err);
                })
            }


            const v = await Vehicule.create({
             matricule: req.body.Matricule,
             name: req.body.carName,
             model: req.body.Model,
             category: req.body.Category,
             rentalRate: req.body.Rate,
             isAvailable: available,
             kilometrage: req.body.Kilometrage,
             carImage:  newImageName
            });
            req.flash('infoSubmit','Vehicule Has Been Added');
            res.redirect('/vehicules');
        } catch (e) {
            res.json(e)
            req.flash('infoErrors','e');
            res.redirect('/vehicules');
        }
    
    },
    
    modifyVehicule: async(req,res,next)=>{
        
        let available = false;
        if(req.body.Available == 'on'){
            available = true
        }
        
        try { 
            let imageUploadFile;
            let uploadPath;
            let newImageName;
            console.log('hi im here');
              if(!req.files || Object.keys(req.files).length === 0){
                  console.log('No Files Were Uploaded!!');
                }else{
                    imageUploadFile = req.files.image;
                    newImageName = Date.now()  + imageUploadFile.name;
                    uploadPath = require('path').resolve('./') + '/public/assets/' + newImageName;
            
                    imageUploadFile.mv(uploadPath, function (err) {
                        if(err) return res.status(500).send(err);
                })
            }
            const id = req.params.id;    
            const v = await Vehicule.findById(id);
            
            v.matricule = req.body.Matricule ? req.body.Matricule : v.matricule;
            v.name = req.body.carName ? req.body.carName : v.name;
            v.model = req.body.Model ? req.body.Model : v.model;
            v.category = req.body.Category ? req.body.Category : v.category;
            v.rentalRate = req.body.Rate ? req.body.Rate : v.rentalRate;
            v.isAvailable = available ? available : v.isAvailable;
            v.kilometrage = req.body.Kilometrage ? req.body.Kilometrage : v.kilometrage;
            v.carImage = req.body.image ? req.body.image : v.carImage;

            
            await v.save();
            console.log('yoooooo');
            console.log("i'm inside middleware");
            req.flash('infoSubmit','Vehicule Has Been Updated!');
            next();
        } catch (e) {
            req.flash('infoErrors','e');
            next();
        }
    },
    
    // deleteVehicule: async (req,res,next)=>{

    //     try {
            
    //         const id = req.params.id,
    //             vehicule = await Vehicule.findById(id);
    //         await vehicule.remove();

    //         res.json({deleted: 'Successfully'});

    //         req.flash('infoSubmit','Vehicule Has Been Deleted Successfully!');
    //         res.redirect('/');
    //     } catch (e) {
    //         req.flash('infoErrors','e');
    //         res.redirect('/');
    //     }

    // },

    homepage: async (req,res,next)=>{
        try {
            //const limitNumber =5;
            const vehicules = await Vehicule.find({}) //.limit(limitNumber);
            res.render('Home', {title: 'Home', vehicules});
        } catch (e) {
            res.json({error: e.message});
        }
    }, 


    showByCategorie: async(req,res,next)=>{ 
        try {                                   
            const cat = req.params.id;
            console.log(cat);
            const vehicules = await Vehicule.find({"category" : cat})
            res.render('category',{title:cat,vehicules,cat});
        } catch (e) {
            res.json({error: e.message});
        }
    },

    searchVehicule: async (req, res, next)=>{

        try {
            let searchvehicule  = req.body.searchvehicule;
            let vehicule = await Vehicule.find({$text: {$search: searchvehicule, $diacriticSensitive: true}}); 

            res.render('search', {title: 'Search', vehicule});
        } catch (e) {
            res.json({error: e.message});
        }

    }
};

