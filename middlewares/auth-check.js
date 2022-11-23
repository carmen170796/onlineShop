function checkAuthentication (req,res,next){
    const uid= req.session.uid;
    if (!uid){
        return next();
    }

    res.locals.uid=uid;
    res.locals.isAuth=true;
    res.locals.isAdmi=req.session.isAdmi
    next();

}

module.exports=checkAuthentication;