//All Products
let allProducts = [
    {
        "name": "Caramel Donuts",
        "price": "price_1HpKxzHqV6fz8FYoUWFgPjQT",
        "quantity": 1,
        "img": 'Images/ear.png',
        "amount": '9.50',
        "freePrice": 'price_1HphCGHqV6fz8FYoVtnLqerr'
    },
    {
        "name": "Minty Ladies",
        "price": "price_1HpMAZHqV6fz8FYomNpxsMvj",
        "quantity": 1,
        "img": 'Images/ear.png',
        "amount": '10.50',
        "freePrice": 'price_1HphBVHqV6fz8FYov4SX4hyO'
    },
    {
        "name": "Tango Swirls",
        "price": "price_1HpM91HqV6fz8FYoOkPczDBB",
        "quantity": 1,
        "img": 'Images/ear.png',
        "amount": '10.90',
        "freePrice": 'price_1HphBtHqV6fz8FYoeOp8Norb'
    }
];

//Items in Cart
let itemsToBuy =[];
let counter = 0;
let changeCounter = 0;

//Formatted items in cart for Stripe
let readyToBuy = [];