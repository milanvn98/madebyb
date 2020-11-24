

// //Save Cart to Storage
function sendToStorage(){
    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null){ existingEntries = []}
    localStorage.setItem('items', JSON.stringify(itemsToBuy));
    existingEntries.push(itemsToBuy);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
}

//When page freshes add previous cart
function refresh(){
    const oldCart = JSON.parse(localStorage.getItem('items'));
    
    if (oldCart == null){
        return;
    } else {
        for (item of oldCart){
            const name = item['name'];
            const price = item['price'];
            const img = item['img'];
            const qty = item['quantity'];
            const colour = item['colour']
            const amount = item['amount']
            const freePrice = item['free{rice']
            const ID = item['ID']
            
           addToCart(name,amount,img,qty,colour);

        }
    }

}

window.onload = function(){
    refresh();
}
