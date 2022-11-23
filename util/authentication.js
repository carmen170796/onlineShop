function createUserSession(req,user,action){
    req.session.uid=user._id.toString(); //req.session: To store or access session data
    req.session.isAdmi=user.isAdmi
    req.session.save(action) //Save the session back to the store, 
}

function terminateUserSession(req){
    req.session.uid=null;
    
}
module.exports={
    createUserSession:createUserSession,
    terminateUserSession:terminateUserSession
}