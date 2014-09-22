var Customer 	= new DataClass('Customers', 'public'),
	utils		= require('utils');

utils.extend(Customer, require('./attributes'));
utils.extend(Customer, require('./methods'));
utils.extend(Customer, require('./events'));

module.exports = Customer;