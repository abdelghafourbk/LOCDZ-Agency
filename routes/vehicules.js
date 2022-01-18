const express = require('express'),
{showVehicule, addVehicule } = require('../middlewares/vehicule');

router = express.Router();

router.route('/').get(showVehicule).post(addVehicule);

module.exports = router;