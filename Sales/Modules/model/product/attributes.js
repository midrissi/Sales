module.exports = {
	ID: new Attribute("storage", "long", "key auto"),
	commands: new Attribute("relatedEntities", "Commands", "product", {
		"reversePath": true
	}),
	category: new Attribute("relatedEntity", "Category", "Category"),
	name: new Attribute("storage", "string"),
	logo: new Attribute("storage", "image"),
	price: new Attribute("storage", "number", null, {
		"defaultFormat": [{
			"presentation": "text",
			"format": "$###,###,##0.00"
		}]
	}),
	nb_remaining_items: new Attribute("storage", "long", null, {
		"minValue": "0",
		"defaultValue": "0"
	}),
	description: new Attribute("storage", "string")
};