const express           = require ('express');
const router            = express.Router ();
const logout_controller = require ('../controller/logout');

router.get ('/', logout_controller.get_logout);

module.exports = router;
