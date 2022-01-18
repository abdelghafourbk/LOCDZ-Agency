const express = require('express'),
Contract = require('../models/contract'),
{ searchContract, modifyContract, consultContract } = require('../middlewares/contract');

router = express.Router();
router.route('/').post(searchContract)
router.route('/:id').get(consultContract).post(modifyContract,consultContract);

router.get('/:id/delete', (req,res)=>{
    Contract.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
             res.redirect('/');
        }else{
            console.log('error' + err);
        }
    })
})
module.exports = router;