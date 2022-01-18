const express = require('express'),
{showContract, addContract} = require('../middlewares/contract');

router = express.Router();
router.route('/').get(showContract).post(addContract);
module.exports = router;