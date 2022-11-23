// creating a custome middleware so that a csrf token goes with every request otherwise i would have to request it with every papge
// req,res,next are parameters that are always part of any middleware
function addCsrfToken (req,res,next){
    //makes the response available to all the views rendered 
    res.locals.csrfToken=req.csrfToken();
    next();
}

module.exports=addCsrfToken;