const formElementGroup=document.querySelectorAll('.order-administration');

async function updateOrder(event){
    event.preventDefault();
    const form=event.target;
    const formData=new FormData(form);
    const newStatus=formData.get('status');
    const csrf=formData.get('_csrf');
    const orderId=formData.get('id');

    let result 

    try{
        result=await fetch(`/admin/orders/${orderId}`,{
            method:'PATCH',
            body: JSON.stringify({
                newStatus:newStatus,
                _csrf:csrf
            }),
            headers:{'Content-type':'application/json'}
        });
    }
    
    catch(error){
        alert('something went wrong');
        return;
    }

    if(!result.ok){
        alert('something went wrong');
        return;
    }

    const responseData= await result.json();
    console.log(responseData);
    form.parentElement.querySelector('.badge').textContent=responseData.newStatus.toUpperCase();
}

for (const formElement of formElementGroup){
    formElement.addEventListener('submit',updateOrder)
}