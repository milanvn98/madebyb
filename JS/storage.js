

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
            const newItem = Object.values(item);
            const name = newItem[9];
            const price = newItem[3];
            const img = newItem[0];
            const qty = newItem[6];
            const colour = newItem[1]
            const amount = newItem[8]
            const freePrice = newItem[10]
            const ID = newItem[4]
            
           addToCart(name,amount,img,qty,colour);

        }
    }

}

window.onload = function(){
    refresh();
}
