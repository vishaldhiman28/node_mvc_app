const express            = require ('express');
const router             = express.Router ();
const landing_controller = require ('../controller/landing_page');

router.get ('/', landing_controller.get_landing);

module.exports = router;
