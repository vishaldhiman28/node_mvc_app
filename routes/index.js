const express          = require ("express");
const router           = express.Router ();
const index_controller = require ('../controller/index');

router.get ('/', index_controller.index);

module.exports = router;
