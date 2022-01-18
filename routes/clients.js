const express = require('express'),
{showClient, addClient} = require('../middlewares/client');

router = express.Router();
router.route('/').get(showClient).post(addClient);
module.exports = router;