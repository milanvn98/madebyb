const stripe = require('stripe')('sk_test_51HouknHqV6fz8FYoZdEKjRMrMEzbx3T1aLiXlwcjDMUxahg7jcBWi6RrEvEZqEaV9r2wh9gve4xEk1gAkAB1Vn1e00tiUfpPc9');

function createCustomer(){
    const customer = stripe.customers.create({
    email: 'milan@vanniekerks.com',
    name: 'Milan van Niekerk'
})};

createCustomer()

