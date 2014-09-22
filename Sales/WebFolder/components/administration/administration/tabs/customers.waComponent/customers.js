
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'teachers';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var
		dataSource 	= sources.customer;
		
		getHtmlObj('container1').searchW({
			datasource: dataSource,
			callback: function(){
				var params = [waf.wildchar + $(this).val() + waf.wildchar],
					query = 'fullname = :1';
					
				dataSource.query(query,{
					params: params
				});
			}
		});
		
		document.getElementById(getHtmlId('matrix1')).onselectstart = function(){
			return false;
		}
	// @region namespaceDeclaration// @startlock
	var matrix1 = {};	// @matrix
	var container4 = {};	// @container
	var container2 = {};	// @container
	var image2 = {};	// @image
	// @endregion// @endlock

	// eventHandlers// @lock

	matrix1.onChildrenDraw = function matrix1_onChildrenDraw (event)// @startlock
	{// @endlock
		$(event.htmlObject)
		.find('.email a')
		.attr('href' , 'mailto:' + dataSource.email);
	};// @lock

	container4.dblclick = function container4_dblclick (event)// @startlock
	{// @endlock
		_ns.Forms.openDialog('addCustomer');
	};// @lock

	container2.click = function container2_click (event)// @startlock
	{// @endlock
		dataSource.addNewElement();
		_ns.Forms.openDialog('addCustomer');
	};// @lock

	image2.click = function image2_click (event)// @startlock
	{// @endlock
		dataSource.removeCurrent();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_matrix1", "onChildrenDraw", matrix1.onChildrenDraw, "WAF");
	WAF.addListener(this.id + "_container4", "dblclick", container4.dblclick, "WAF");
	WAF.addListener(this.id + "_container2", "click", container2.click, "WAF");
	WAF.addListener(this.id + "_image2", "click", image2.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
