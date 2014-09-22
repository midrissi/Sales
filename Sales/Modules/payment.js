var module = require('wak-paypal');

var paypalModule = new module.Paypal();
var payments = {};

payments.create 	= function(params)
{
	
	var response 	= 	paypalModule.payments.create(params.intent, params.payer, params.transactions, params.redirect_urls);
	//you can format the response first, check for errors etc
	return response;
}

for( var element in payments )
{
	exports[element] = payments[element];
}