

//Initialise Airtable
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyjTObjWhni5eyct'}).base('appjYKJVgxZHC2dZf');


//Retrieve All Products from Airtable
let allProducts = []

//Items in Cart
let itemsToBuy =[];
let counter = 0;
let changeCounter = 0;

//Formatted items in cart for Stripe
let readyToBuy = [];

base('Products').select({
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        allProducts.push(record.fields);
    });
    fetchNextPage();
    refresh();
}, function done(err) {
    if (err) { console.error(err); return; }
});


//Send Customer to Orders Table
function submitCustomer(){
    base('Orders').create([
        {
          "fields": {
            "First Name": customer.firstName,
            "Last Name": customer.lastName,
            "Email": customer.email,
            "Phone": customer.phone,
            "Address": customer.address,
            "Postcode": customer.postcode,
            "Order": readyAirtable
          }
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
      });
       
}




