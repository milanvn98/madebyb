//Three for Two Offer
let counter = 11 + 11 + 9
let itemsToBuy = [{
    name: 'Tango Swirls',
    colour: 'Black',
    quantity: 9,
    amount: '10.95',
    price: 'priceCodeTango',
    freePrice: 'freePriceTango'
    },
    {
        name: 'N-Drops',
        colour: 'Blue',
        quantity: 11,
        amount: '10.50',
        price: 'priceCodeDrops',
        freePrice: 'freePriceDrops'
        },
        {
            name: 'Curvy Girls',
            colour: 'Green',
            quantity: 11,
            amount: '10.50',
            price: 'priceCodeCurvy',
            freePrice: 'freePriceCurvy'
            }
]


for (item of itemsToBuy){
    for (key in item){
        if (key != "price" && key != "quantity"){
            delete item[key]
        }
    }
}


