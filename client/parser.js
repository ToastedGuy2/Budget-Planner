const parseCurrency = require("parsecurrency");
const dolars = parseCurrency("$1");
console.log(`Result ${dolars.value}`);
