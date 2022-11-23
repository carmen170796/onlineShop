    const User=require('../model/user.model');
    const authUtil=require('../util/authentication');
    const validation=require('../util/validation');
    const sessionFlashData=require('../util/data-session');

    function getSignUp (req,res){
        let sessionFlash= sessionFlashData.getSessionData(req);
        if(!sessionFlash){
            sessionFlash={
                email:"",
                confirmEmail: "",
                password:"",
                name:"",
                street:"",
                postalCode:"",
                city:""
            }
        
        }
        res.render('customer/auth/signup',{inputData:sessionFlash});
    }

    function getLogin (req,res){
        let sessionFlash= sessionFlashData.getSessionData(req);
        if(!sessionFlash){
            sessionFlash={
                email:"",
                password:""
            }
        }
        res.render('customer/auth/login',{inputData:sessionFlash});
    }

    async function signUp (req,res){
        const enteredData={
            email:req.body.email,
            confirmEmail:req.body['confirm-email'],
            password:req.body.password,
            name:req.body.name,
            street:req.body.street,
            postalCode:req.body.postalCode,
            city:req.body.city
        }
        if (!validation.validateSignUp(req.body.email,req.body['confirm-email'],req.body.password,req.body.name,
            req.body.street,req.body.postalCode,req.body.city)){

            sessionFlashData.flashData(req,{
                errorMessage: 'Please check your input',
                ...enteredData
                }, function(){
                res.redirect('/signup');
                });
                return;
            }
            
        const newUser= new User (req.body.email,req.body.password, req.body.name, req.body.street,req.body.postalCode,req.body.city);

        let existingUser;

        try{
            existingUser= await newUser.existsAlready();

            if (existingUser){
                sessionFlashData.flashData(req,{
                    errorMessage:'This email is already in use',
                    ...enteredData
                },function() {
                    res.redirect('/signup');
                });
                return;
            }
            
                await newUser.signUp();

        }
        
        catch (error){
            next(error);
            return;
        }
            
        res.redirect('/login');         
    }
        

    async function logIn(req,res){
        const newUser= new User (req.body.email,req.body.password)
        let existingUser
        try{
           existingUser=  await newUser.getUserWithSameEmail();
        }
        catch(error){
            next(error);
            return;
        }
        
        const sessionErrorData={
            errorMessage:'Please check your credentials',
            email: newUser.email,
            password:newUser.password
        }
        if (!existingUser){
            sessionFlashData.flashData(req,sessionErrorData,function(){
                res.redirect('/login')
            })
            return;
        }
        const passwordsMatch= await newUser.logIn(existingUser.password);

        if (!passwordsMatch){
            sessionFlashData.flashData(req,sessionErrorData,function(){
            res.redirect('/login')
            })
            return;
        }

        authUtil.createUserSession(req,existingUser,function () {
            res.redirect('/')
        })
        
    }

     function logOut(req,res){
        authUtil.terminateUserSession(req);
        res.redirect('/');
    }
    
    module.exports= {
        getSignUp:getSignUp,
        getLogin:getLogin,
        signUp:signUp,
        logIn:logIn,
        logOut:logOut
    }