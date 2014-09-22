var result = {
	ID: new Attribute("storage", "long", "key auto"),
	product: new Attribute("relatedEntity", "Product", "Product"),
	order: new Attribute("relatedEntity", "Order", "Order"),
	total: new Attribute("calculated", "number"),
	quantity: new Attribute("storage", "long")
};

result.total.onGet = function on_get () {
	if(this.product){
		return this.quantity*this.product.price;
	}
	
	return 0;
};

module.exports = result;