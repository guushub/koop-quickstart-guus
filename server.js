const Koop = require('Koop');
const guusProvider = require('./guus-provider');
const craigslist = require('./koop-provider-craigslist')

const koop = new Koop();
const port = 8000;

koop.register(guusProvider);
koop.register(craigslist);

koop.server.listen(port);


const message = `

Koop is listening on ${port}

Guus provider example has no id and host parameters: http://localhost:${port}/guus-provider/FeatureServer/0/query
Or for craigslist example, with the use of id and host parameters: http://localhost:${port}/craigslist/atlanta/apartments/FeatureServer/0/query

Press control + c to exit
`
console.log(message)