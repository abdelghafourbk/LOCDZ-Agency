const express = require('express'),
{showReservation, addReservation} = require('../middlewares/reservation');

router = express.Router();
router.route('/').get(showReservation).post(addReservation);
module.exports = router;