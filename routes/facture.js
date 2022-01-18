const express = require('express'),
Facture = require('../models/facture'),
{ searchFacture, modifyFacture, consultFacture } = require('../middlewares/facture');

router = express.Router();
router.route('/').post(searchFacture)
router.route('/:id').get(consultFacture).post(modifyFacture,consultFacture);

router.get('/:id/delete', (req,res)=>{
    Facture.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
             res.redirect('/');
        }else{
            console.log('error' + err);
        }
    })
})
module.exports = router;