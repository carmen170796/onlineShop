const mongodb=require('mongodb');
//change value below
const uri = "mongoDbUri"
const MongoClient=mongodb.MongoClient;

let database 

async function connectToDataBase(){

    //Connect to MongoDB using a url  
    const client= new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        //change value now
        database  = client.db('dataBaseName')     
    } catch (e) {
        console.error(e);
    }

}

function getDb(){
    if (!database){
        throw new Error ("You must connect first!")
    }

    else {
        return database;
    }
}

module.exports={
    connectToDataBase:connectToDataBase,
    getDb:getDb

}