const express          = require ('express');
const router           = express.Router ();
const login_controller = require ('../controller/login'); 

router.get ('/', login_controller.get_login);

router.post  ('/', login_controller.post_login);

module.exports = router;
