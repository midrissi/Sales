var formatter = require("formatting");
				
var result = {
	ID: new Attribute("storage", "long", "key auto"),
	firstname: new Attribute("storage", "string", "btree"),
	lastname: new Attribute("storage", "string", "btree"),
	fullname: new Attribute("calculated", "string"),
	phoneNumber: new Attribute("storage", "string"),
	image: new Attribute("storage", "image"),
	email: new Attribute("storage", "string", "btree", {
		unique: true
	}),
	login: new Attribute("storage", "string", "btree", {
		unique: true
	}),
	ha1key: new Attribute("storage", "string", {
		scope: 'publicOnServer'
	}),
	password: new Attribute("calculated", "string"),
	address: new Attribute("storage", "string"),
	orders: new Attribute("relatedEntities", "Orders", "customer", {
		"reversePath": true
	})
};


/**************************************************************************
 | Attributes events
 *************************************************************************/
 
result.password.onGet = function(){
	return "************";
};

result.password.onSet = function(value){
	this.ha1key = directory.computeHA1(this.getKey(), value);
};

result.fullname.onGet = function(){
	return formatter.formatString(this.firstname, "c") + " " + formatter.formatString(this.lastname, "U");
};

module.exports = result;