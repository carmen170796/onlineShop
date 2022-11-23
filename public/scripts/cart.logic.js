
const addToCartBtn=document.getElementById('addToCart');
const itemsCounter=document.getElementById('itemsCounter');

async function updateCount(){
    let result;
    const productId= addToCartBtn.dataset.id;
    const csrf=addToCartBtn.dataset.csrf;

    try{
       result= await fetch ('/cart/items',{
            method:'POST',
            body: JSON.stringify({
                productId:productId,
                _csrf:csrf
                }),
            headers:{
                'Content-Type':'application/json'
            }
        });
    }

    catch(error){ 
        alert('Something went wrong!');
        return; 
    }

    if(!result.ok){
        alert("Something went wrong!");
        return ;

    }

        const responseData=await result.json();
        alert(responseData.message);
        itemsCounter.textContent=responseData.totalItems;
}
addToCartBtn.addEventListener('click',updateCount);