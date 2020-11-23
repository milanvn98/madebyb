

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
            const name = newItem[6];
            const price = newItem[2];
            const img = newItem[0];
            const qty = newItem[4];
            const colour = newItem[1]
            const amount = newItem[5]
            const freePrice = newItem[7]
            const ID = newItem[3]
            
           addToCart(name,amount,img,qty,colour);

        }
    }

}

