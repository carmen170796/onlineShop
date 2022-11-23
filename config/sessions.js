const session=require('express-session');
const mongoDbStore=require('connect-mongodb-session');
//change value below
const uri = "Insert your MongoDbUri" 
function createSessionStore(){
    const MongoDBStore = mongoDbStore(session);
    const store =new MongoDBStore({
        uri: uri,
        //change value below
        database: 'insert name of your database where you are gonna store the session',
        collection: 'sessions'

    });
    return store;
}

function createSessionConfig(){
    return {
        //change code below
        secret: 'secret',
        resave: false,
        saveUninitialized: false, 
        store: createSessionStore(),
        cookie: {
            maxAge: 2*24*60*60*1000,
        }
    }
};

module.exports= createSessionConfig;
