
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyjTObjWhni5eyct'}).base('appjYKJVgxZHC2dZf');
let customers = []


base('Products').select({
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        customers.push('record');
        console.log(record);
    });
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
