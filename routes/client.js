const express = require('express'),
Client = require('../models/client'),
{ searchClient, modifyClient, consultClient } = require('../middlewares/client');

router = express.Router();
router.route('/').post(searchClient)
router.route('/:id').get(consultClient).post(modifyClient,consultClient);

router.get('/:id/delete', (req,res)=>{
    Client.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
             res.redirect('/');
        }else{
            console.log('error' + err);
        }
    })
})
module.exports = router;