
//Stripe Variables
var stripe = Stripe('pk_test_51HouknHqV6fz8FYoGF7Rreokgx8ZtBp5G3Fvs526LbFRbTBQaFHLZBvkDix5EfXjM3KImt0AUCmwW6saLGoYomlZ007u6JYruU');


//Add Checkout Listener
const checkoutButton = document.querySelector('#checkout-button');
checkoutButton.addEventListener('click', checkout);


function checkout(){
    //Add Three for Two Offer
    threeForTwo();

    //Format for Stripe
    const readyToBuy = itemsToBuy.map(({name, img, amount, freePrice, ...keepAttrs}) => keepAttrs)
    console.log(readyToBuy);

    //Send to Stripe
    stripe.redirectToCheckout({
    lineItems: [...readyToBuy],
    mode: 'payment',
    successUrl: 'https://www.example.com/success',
    cancelUrl: 'https://www.example.com/cancel'
  });

    //Remove Storage
    localStorage.removeItem('items');
    localStorage.removeItem('allEntries');
}


//Three for Two Offer
function threeForTwo(){
    let lowestProduct = itemsToBuy[0];
    let lowestPrice = Number.POSITIVE_INFINITY
    
    //Find Lowest Costing Product
    for (item of itemsToBuy){
        let amount = Number(item.amount)
        if (amount < lowestPrice && item.quantity > 0){
            lowestPrice = amount
            lowestProduct = item
        }
    }

    //Remove One from Product
    lowestProduct.quantity -= 1
    if (lowestProduct.quantity < 1){
        const zeroQty = itemsToBuy.findIndex(item => item.quantity === 0);
        itemsToBuy.splice(zeroQty, 1);
    }

    //Add Free Version of Product
    const freeItem = {...lowestProduct};
    freeItem.price = freeItem.freePrice;
    freeItem.quantity = 1;

    //Check if item exists, if yes then add qty + 1, if not then add to list
    const checkItem = itemsToBuy.find(item => item.price == freeItem.price);
    if (!checkItem){
        itemsToBuy.push(freeItem)
    } else {
        itemsToBuy[itemsToBuy.length - 1].quantity += 1;
    };

    counter -= 3;

    while (counter >= 3 ){
        threeForTwo()
    }
}