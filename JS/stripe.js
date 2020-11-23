

//Inititlaise Stripe
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51HouknHqV6fz8FYoZdEKjRMrMEzbx3T1aLiXlwcjDMUxahg7jcBWi6RrEvEZqEaV9r2wh9gve4xEk1gAkAB1Vn1e00tiUfpPc9');


//Create Product
const product = stripe.products.create({
    name: 'Limited Edition T-Shirt',
    type: 'good',
    attributes: ['size', 'gender', 'color'],
    description: 'Super awesome, one-of-a-kind t-shirt',
  });


  //Create sku
  const sku1 = stripe.skus.create({
    currency: 'usd',
    inventory: {'type': 'finite', 'quantity': 500},
    price: 1500,
    product: 'prod_IQCpl4PkFrwZRX',
    attributes: {'size': 'Medium', 'gender': 'Unisex', 'color': 'Cyan'},
  });

  //Create Order
  const order = stripe.orders.create({
    currency: 'usd',
    email: 'jenny.rosen@example.com',
    items: [
      {
        type: 'sku',
        parent: 'sku_IReHsvOVDcTH6L',
        quantity: 2,
      },
    ],
    shipping: {
      name: 'Jenny Rosen',
      address: {
        line1: '1234 Main Street',
        city: 'San Francisco',
        state: 'CA',
        postal_code: '94111',
        country: 'US',
      },
    },
  });

  // Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
var token = request.body.stripeToken; // Using Express

stripe.orders.pay('or_1HqkzGHqV6fz8FYo2tJZokXl', {
  source: token,
})
