module.exports = {
	ID: new Attribute("storage", "long", "key auto"),
	products: new Attribute("relatedEntities", "Products", "category", {
		"reversePath": true
	}),
	name: new Attribute("storage", "string"),
	color: new Attribute("storage", "string"),
	description: new Attribute("storage", "string")
};