isSessionExist = function(req,res,next){
        if(req.session.user && req.cookies.user_id){
           res.render('landingPage', {name: req.session.user.name})
        }
       else{
         next();
       }
};

