//Three for Two Offer
let counter = 21
let itemsToBuy = [{
    name: 'Tango Swirls',
    colour: 'Black',
    quantity: 3,
    amount: '10.95',
    price: 'priceCodeTango',
    freePrice: 'freePriceTango'
    },
    {
    name: 'Tango Swirls',
    colour: 'Orange',
    quantity: 4,
    amount: '10.95',
    price: 'priceCodeTango',
    freePrice: 'freePriceTango'
    },
    {
        name: 'N-Drops',
        colour: 'Blue',
        quantity: 3,
        amount: '10.50',
        price: 'priceCodeDrops',
        freePrice: 'freePriceDrops'
        },
        {
        name: 'N-Drops',
        colour: 'Green',
        quantity: 4,
        amount: '10.50',
        price: 'priceCodeDrops',
        freePrice: 'freePriceDrops'
        },
        {
            name: 'Curvy Girls',
            colour: 'Green',
            quantity: 7,
            amount: '9.95',
            price: 'freePriceCurvy',
            freePrice: 'freePriceCurvy'
            }
]

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
    console.log(itemsToBuy)
}


threeForTwo()
findDuplicates(itemsToBuy)


