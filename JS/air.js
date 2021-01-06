

//Initialise Airtable
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyjTObjWhni5eyct'}).base('appjYKJVgxZHC2dZf');


// 


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



