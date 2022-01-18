const express = require('express'),
{showByCategorie} = require('../middlewares/vehicule');

router = express.Router();

router.route('/:id').get(showByCategorie);
module.exports = router;