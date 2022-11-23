const db= require('../data/database');
const mongodb=require('mongodb')

class Order{
    constructor(cart, userData, status='pending',date, orderId){
        this.productData=cart;
        this.userData=userData;
        this.status=status;
        this.date=new Date(date);
        if (this.date){
            this.modifiedDate=this.date.toLocaleDateString('en-GB',{
                weekday: 'short',
                month:'short',
                day:'numeric',
                year:'numeric'
            });
        }
        this.id=orderId
    }

    static convertOrder(order){
        return new Order(order.productData,order.userData,order.status.toUpperCase(),order.date,order._id);
    }
    static convertOrderData(orderData){
        return orderData.map(this.convertOrder);
    }

    static async getOrderId(id){
        const orderId=new mongodb.ObjectId(id)
        const order= await db.getDb().collection('orders').findOne({_id:orderId});
        return this.convertOrder(order)
    }
    async save(){

        if (this.id){
            const orderId= new mongodb.ObjectId(this.id)
            return await db
                .getDb()
                .collection('orders')
                .updateOne({_id:orderId},{$set:{status:this.status}});
        }

        else {
            const orderData={
                productData:this.productData,
                userData:this.userData,
                status:this.status,
                date: new Date()
            }
        return await db.getDb().collection('orders').insertOne(orderData);
        }
    }

    static async allOrders(){
        const orderData=await db
        .getDb()
        .collection('orders')
        .find()
        .toArray();

        return this.convertOrderData(orderData)
    }
    static async ordersFromUser(userId){
        const id=new mongodb.ObjectId(userId)

        const orderData=await db
        .getDb()
        .collection('orders')
        .find({'userData._id':id})
        .toArray();

        return this.convertOrderData(orderData)
    }

}

module.exports=Order;