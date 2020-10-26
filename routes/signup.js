const express            = require ('express');
const router             = express.Router ();
const signup_controller  = require ('../controller/signup');


router.get ('/', signup_controller.get_signup);
router.post ('/', signup_controller.post_signup);

module.exports = router;
