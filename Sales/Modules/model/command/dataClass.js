var Customer 	= new DataClass('Commands', 'public'),
	utils		= require('utils');

utils.extend(Customer, require('./attributes'));
utils.extend(Customer, require('./methods'));
utils.extend(Customer, require('./events'));

module.exports = Customer;