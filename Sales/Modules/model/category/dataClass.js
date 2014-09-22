var Category	= new DataClass('Categories', 'public'),
	utils	= require('utils');

utils.extend(Category, require('./attributes'));
utils.extend(Category, require('./methods'));
utils.extend(Category, require('./events')); 

module.exports = Category;
