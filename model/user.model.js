const bcrypt= require ('bcryptjs');
const db= require('../data/database');
const mongodb=require('mongodb');

class User {
    constructor(email,password,name,street,postalCode,city){
        this.email=email;
        this.password=password;
        this.name=name;
        this.address={
            street:street,
            postalCode:postalCode,
            city:city};
    }

    static async getById(userId){
        const id=new mongodb.ObjectId(userId);
        const userData= await db.getDb().collection('users').findOne({_id:id},{projection:{password:0}})
        console.log(userData)
        return userData;
    }
    
    async getUserWithSameEmail(){
        const existingUser= await db
        .getDb()
        .collection('users')
        .findOne({email:this.email});

        return existingUser;
    }

    async existsAlready(){
        const existingUser= await this.getUserWithSameEmail();
        if (existingUser){
            return true;
        }
        else 
            return false;
    }


    async signUp (){
        const hashedPassword=await bcrypt.hash(this.password,12);
        const user={
            email:this.email,
            password:hashedPassword,
            name:this.name,
            address:this.address,
        }
        const result =await db.getDb().collection('users').insertOne(user);
        return result;
    }

    async logIn(comparePassword){
        return await bcrypt.compare(this.password,comparePassword);
    

    }
}

module.exports=User;

  