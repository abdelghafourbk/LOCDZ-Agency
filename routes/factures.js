const express = require('express'),
{showFacture, addFacture} = require('../middlewares/facture');

router = express.Router();
router.route('/').get(showFacture).post(addFacture);
module.exports = router;