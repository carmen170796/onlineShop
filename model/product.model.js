const db=require('../data/database');
const mongodb=require('mongodb');

class Product{ 
    constructor(productData){
        this.title=productData.title;
        this.summary=productData.summary;
        this.price=+productData.price;
        this.description=productData.description;
        this.img=productData.img;
        if (productData._id){
            this.id=productData._id.toString();
        }
    }
        
    static async fetchAll(){
        const products =await db.getDb().collection('products').find().toArray();
        return products.map(function(product){
            return new Product(product)
        });
    }

    static async fetchOne(id){
        let idProduct
        try{
           idProduct = new mongodb.ObjectId(id)
        } 
        catch (error){
            error.code=404;
            throw error;
        }
        const product= await db.getDb().collection('products').findOne({_id:idProduct})
        if(!product){
            const error= new Error ('Could not find the product with this id') ;
            error.code=404;
            throw error;
        }
        return new Product(product);
    }

    async saveItem(){
        
        const product={
            title:this.title,
            summary:this.summary,
            price:this.price,
            description:this.description,
            img:this.img,
        }
       
 
        if (this.id){
            const idProduct= new mongodb.ObjectId(this.id);
            if(!this.img){
                delete product.img;
            }
           
           return await db.getDb().collection('products').updateOne({_id:idProduct},{$set:product})
           
         }
         
         else{
            return await db.getDb().collection('products').insertOne(product);
        }
    }

    static async updateImage(newImgUrl,id){
        let productId 
        try{
           productId =  mongodb.ObjectId(id);
           await db.getDb().collection('products').updateOne({_id:productId},{$set:{img:newImgUrl}})
           
        }
        catch{
            error.code=404;
            throw error;
        }
         
    }
 
     static async delete(id){
        let productId
        try{
        productId=mongodb.ObjectId(id)
         await db.getDb().collection('products').deleteOne({_id:productId});
        }
        catch{
            error.code=404;
            throw error;
        }
     }
 }
 

module.exports=Product;