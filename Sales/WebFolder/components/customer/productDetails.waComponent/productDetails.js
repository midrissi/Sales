
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'studentDetails';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
	var container6 = {};	// @container
	var icon3 = {};	// @icon
	// @endregion// @endlock

	// eventHandlers// @lock

	container1.click = function container1_click (event)// @startlock
	{// @endlock
		var nb = parseInt($comp.widgets['nb_items'].getValue());
		_ns.addCurrentProduct(nb);
		$comp.widgets['nb_items'].setValue(1);
		$$('mainDialog').closeDialog();
	};// @lock

	icon3.click = function icon3_click (event)// @startlock
	{// @endlock
		$$('mainDialog').closeDialog();
	};// @lock
	

	container6.click = function container6_click (event)// @startlock
	{// @endlock
		$$('mainDialog').closeDialog();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_container1", "click", container1.click, "WAF");
	WAF.addListener(this.id + "_icon3", "click", icon3.click, "WAF");
	WAF.addListener(this.id + "_container6", "click", container6.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
