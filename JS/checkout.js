//Submit Page
const submitButton = document.querySelector('#submit');
let readyAirtable = []

const customer = {firstName: '', lastName: '', email: '', phone: '', address: '', postcode: ''}

submitButton.addEventListener('click', function(){
    customer.firstName = document.getElementById('firstName').value
    customer.lastName = document.getElementById('lastName').value
    customer.email = document.getElementById('email').value
    customer.phone = document.getElementById('phone').value
    customer.address = document.getElementById('address').value
    customer.postcode = document.getElementById('postcode').value
    
    for (item of itemsToBuy){
        readyAirtable.push(item.name, item.quantity, item.colour)
    }
    readyAirtable = readyAirtable.toString()
    
    console.log(itemsToBuy)
    submitCustomer();
    checkout();
})


//Stripe Variables
var stripe = Stripe('pk_test_51HouknHqV6fz8FYoGF7Rreokgx8ZtBp5G3Fvs526LbFRbTBQaFHLZBvkDix5EfXjM3KImt0AUCmwW6saLGoYomlZ007u6JYruU');


function checkout(){
    //Add Three for Two Offer
    findDuplicates(itemsToBuy);
    threeForTwo();

    //Format for Stripe
    const readyToBuy = itemsToBuy.map(({name, img, amount, freePrice, colour, ID, ...keepAttrs}) => keepAttrs)

    //Send to Stripe
    stripe.redirectToCheckout({
    lineItems: [...readyToBuy],
    mode: 'payment',
    successUrl: 'https://madebyb.netlify.app/',
    cancelUrl: 'https://madebyb.netlify.app/'
  });

//     // Remove Storage
    // localStorage.removeItem('items');
    // localStorage.removeItem('allEntries');
}


//Three for Two Offer
function threeForTwo(){
    while (counter >= 3 ){
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
        
    }

    itemsToBuy = [...itemsToBuy]
}

//Find Duplicates and Increase Quantity
function findDuplicates(array){
    const count = {}
    const items = [];
    
    //Get item Names:
    for (item of array){
        items.push(item['name'])
    }

   //List Duplicates
    for (item of items){
        if (count[item]){
            count[item] += 1
        } else {
            count[item] = 1
        }

    }   
        
    //Remove from Buy List
    const keys = Object.keys(count);
    let addQTY = 0;
    for (key of keys){
        let loop = count[key] - 1;
        while (loop > 0){
            const dupItemIndex = itemsToBuy.findIndex(item => item.name == key)
            const dupItem = itemsToBuy.find(item => item.name == key)
            addQTY += dupItem.quantity
            itemsToBuy.splice(dupItemIndex, 1)
            loop --;
        }

        const incItem = itemsToBuy.find(item => item.name == key)
        incItem.quantity += addQTY
    }
    
}
