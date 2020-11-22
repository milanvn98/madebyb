

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
            const name = newItem[0];
            const price = newItem[4];
            const img = newItem[3];
            const qty = newItem[2];

           addToCart(name,price,img,qty);

        }
    }

}

refresh();
