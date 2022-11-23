class Cart{
    constructor(items=[], totalQuantity=0, totalAmount=0){
    this.items=items;
    this.totalQuantity=totalQuantity;
    this.totalAmount=totalAmount;
    }


    addtoCart(product){
        const cartItem={
            product:product,
            quantity:1,
            finalPrice:product.price
        }
        for (let i=0;i<this.items.length;i++){

            if(this.items[i].product.id===product.id){
                cartItem.quantity= this.items[i].quantity+1;
                cartItem.finalPrice= this.items[i].finalPrice+product.price;
                this.items[i]=cartItem;
                this.totalQuantity++;
                this.totalAmount+=product.price; 
                return;
            }
        }

        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalAmount+=product.price;

    }

    updateItem(productId,newQuantity){
        console.log(this.items.length)
        for (let i=0;i<this.items.length;i++){
            let item=this.items[i];
            if(item.product.id===productId){
                const cartItem={...item};
                const difference=newQuantity-this.items[i].quantity;
                cartItem.quantity=+newQuantity;
                cartItem.finalPrice=item.product.price*newQuantity;
                this.items[i]=cartItem;
                
                this.totalQuantity+=difference;
                this.totalAmount+=difference*this.items[i].product.price;
                return {updatedItemPrice:cartItem.finalPrice};
                
            }
        }   
            
    }
}


module.exports=Cart; 
