const express = require("express");
const path = require('path');
// require the package for sessions 
const session=require('express-session')
const createSessionConfig=require('./config/sessions')
//require the package for csrf token
const csrf=require('csurf');
const addCsrfToken=require('./middlewares/csrf-token')
const errorHandler=require('./middlewares/error-handling')
const checkAuthentication=require('./middlewares/auth-check')
const routesProtection=require('./middlewares/routes-protection')
const startCart=require('./middlewares/cart')
//connecting to the routes
const authRoutes=require('./routes/auth.routes');
const baseRoutes=require('./routes/base.routes');
const productsRoutes=require('./routes/products.routes');
const adminRoutes=require('./routes/admin.routes');
const cartRoutes=require('./routes/cart.routes');
const orderRoutes=require('./routes/orders.routes');
//require the database 
const db=require('./data/database');



const app = express();

// stablish the view engine to ejs
app.set('view engine','ejs');

// assigns the views name to a value in this case the joined path
app.set('views', path.join(__dirname,'views'));

//Each app.use(middleware) is called every time a request is sent to the server.
//serve static files in node.js. it will the file from the directory called public (serving css files)
app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'));

//parsing through a document 
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//implementing the session
const sessionConfig=createSessionConfig();
app.use(session(sessionConfig));
//call csrf token everytime a request is sent / generate a token + check incoming token for validity
app.use(csrf());
//distributes generated token to other middlewares, views
app.use(addCsrfToken);
app.use(startCart);
// checks for authentification 
app.use(checkAuthentication);

//connect to the routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart',cartRoutes);
app.use(routesProtection);
app.use('/orders',orderRoutes);
app.use('/admin',adminRoutes);

// when using middleware you dont need to execute it, just mention it and then the programm decides when you execute it 
app.use(errorHandler);
// connect to database 
db.connectToDataBase()
    .then(function(){
        app.listen(process.env.PORT || 3000);
    }) 

    // if connection fails, then show error and message 
    .catch(function (error) {
        console.log("Failed to connect to database");
        console.log(error);
    });

