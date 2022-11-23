const { contentType }=require('express/lib/response');

function validateSignUp(email,confirmEmail,password,name,street,postalCode,city){
    return ( email && confirmEmail && password&& 
        name&& street&& postalCode&&city&&
        email===confirmEmail&& email.includes('@'))
}

module.exports={
    validateSignUp:validateSignUp
}