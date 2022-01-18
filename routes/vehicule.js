const express = require('express'),
 Vehicule = require('../models/vehicule'),
{consultVehicule, modifyVehicule} = require('../middlewares/vehicule');

router = express.Router();
router.route('/:id').get(consultVehicule).post(modifyVehicule, consultVehicule);

router.get('/:id/delete', (req,res)=>{
    Vehicule.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
             res.redirect('/');
        }else{
            console.log('error' + err);
        }
    })
});

module.exports = router;

