const express = require('express'),
Reservation = require('../models/reservation'),
{ searchReservation, modifyReservation, consultReservation } = require('../middlewares/reservation');

router = express.Router();
router.route('/').post(searchReservation)
router.route('/:id').get(consultReservation).post(modifyReservation,consultReservation);

router.get('/:id/delete', (req,res)=>{
    Reservation.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
             res.redirect('/');
        }else{
            console.log('error' + err);
        }
    })
})
module.exports = router;