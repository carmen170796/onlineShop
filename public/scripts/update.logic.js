const formElementGroup=document.querySelectorAll('.item-modification')
const totalAmountElement=document.querySelector('div.final-details span');
const itemsCounterElement=document.getElementById('itemsCounter');


async function updateCart(event) {
    event.preventDefault();
    const form=event.target; 
    const productId=form.dataset.id;
    const csrf=form.dataset.csrf;
    const newQuantity= form.firstElementChild.value;
    let result

    try{
        result= await fetch('/cart/items',{
            method:'PATCH',
            body: JSON.stringify({
                productId:productId,
                newQuantity:newQuantity,
                _csrf:csrf
                }),
            headers:{
                'Content-type':'application/json'
            }
        });
    }

    catch(error){
        alert('Something went wrong');
        return;
    }

    if (!result.ok){
        alert('Something went wrong');
        return;
    }
 
    const responseData= await result.json();
    console.log(responseData);
    alert(responseData.message);
    if(responseData.updatedCartData.updatedItemPrice===0){
        console.log(form.parentElement)
        form.parentElement.remove();
    } else {
        const totalPriceItemElement=form.parentElement.querySelector('.item-total-price');
        console.log(totalPriceItemElement)
        console.log(responseData.updatedCartData.updatedItemPrice)
        totalPriceItemElement.textContent=responseData.updatedCartData.updatedItemPrice;
    }

    totalAmountElement.textContent=responseData.updatedCartData.newTotalAmount;
    itemsCounterElement.textContent=responseData.updatedCartData.newTotalQuantity;
    
    
}

for (const formElement of formElementGroup ){
    formElement.addEventListener('submit',updateCart);
}

