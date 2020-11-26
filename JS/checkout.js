//Submit Page
const submitButton = document.querySelector('#submit');
let readyAirtable = []

const customer = {firstName: '', lastName: '', email: '', phone: '', address: '', postcode: ''}

submitButton.addEventListener('click', submitForm);

function submitForm(){
    customer.firstName = document.getElementById('firstName').value
    customer.lastName = document.getElementById('lastName').value
    customer.email = document.getElementById('email').value
    customer.phone = document.getElementById('phone').value
    customer.address = document.getElementById('address').value
    customer.postcode = document.getElementById('postcode').value
    
    const required = Object.values(customer)
    for (field of required){
        if (field == ""){
            alert("Please complete all the fields below.")
            return
        }
    }

    for (item of itemsToBuy){
        readyAirtable.push(item.name, item.quantity, item.colour)
    }
    readyAirtable = readyAirtable.toString()
    
    submitCustomer();
    checkout();
}


//Stripe Variables
var stripe = Stripe('pk_live_51HouknHqV6fz8FYoU51mUgRQs7J5ndQBwM64gmpLakr2T5O21vCO5Ht31DUhjyTyFMeOybc13U0PXHzYKGGBrNoD00ShuHux5q');


function checkout(){


    //Find Duplicates
    findDuplicates(itemsToBuy);

    // //Add Three for Two Offer
    const promoCode = document.querySelector('#code').value
    if (promoCode != ""){
        if (promoCode == '342madebyb' || promoCode == '342MADEBYB'){
            threeForTwo();
        } else {
            alert('Invalid Promo Code');
            readyAirtable=[];
            return
        }
    }
    
     //Format for Stripe
     for (item of itemsToBuy){
        for (key in item){
            if (key != "price" && key != "quantity"){
                delete item[key]
            }
        }
    }
    
    if (itemsToBuy.length == 0){
        alert("No items in cart.")
        return;
    }


    //Send to Stripe
    stripe.redirectToCheckout({
    lineItems: [...itemsToBuy],
    mode: 'payment',
    successUrl: 'https://madebyb.uk/confirmation',
    cancelUrl: 'https://madebyb.uk/store'
  });

    // Remove Storage
    // itemsToBuy = []
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
        if (amount < lowestPrice && item.quantity > 0 && item.price != item.freePrice){
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
        checkItem.quantity += 1;
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
    
    for (key of keys){
        let addQTY = 0;
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
