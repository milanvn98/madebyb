

//Initialise Airtable
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyjTObjWhni5eyct'}).base('appjYKJVgxZHC2dZf');


//Retrieve All Products from Airtable
let allProducts = []


// base('Products').select({
// }).eachPage(function page(records, fetchNextPage) {
//     records.forEach(function(record) {
//         allProducts.push(record.fields);
//     });
//     fetchNextPage();
//     // refresh();
// }, function done(err) {
//     if (err) { console.error(err); return; }
// });


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
          Email.send({
            Host : "smtp.elasticemail.com",
            Username : "milan@vanniekerks.com",
            Password : "503D77419596F20D51EA15E87591CE40FD6B",
            To : 'beth.poultney@googlemail.com',
            From : "milan@vanniekerks.com",
            Subject : "New Order - MadebyB",
            Body : customer.name + " " + customer.address + " " + readyAirtable
            });
          return;
        }
      })
      
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : "milan@vanniekerks.com",
        Password : "503D77419596F20D51EA15E87591CE40FD6B",
        To : 'beth.poultney@googlemail.com',
        From : "milan@vanniekerks.com",
        Subject : "New Order - MadebyB",
        Body : customer.name + " " + customer.address + " " + readyAirtable
        });
        
        ;
       
}

// function loading(){
// if (allProducts.length > 0){
//   console.log(allProducts)
// } else {
//   setTimeout(() => {
//     loading()
// }, 1000)
// }
// }
// loading()


