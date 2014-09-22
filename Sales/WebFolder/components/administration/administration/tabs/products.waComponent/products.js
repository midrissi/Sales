
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'teachers';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var
		dataSource 	= sources.product,
		categoryDS	= sources[getHtmlId('category')];
		
		getHtmlObj('container1').searchW({
			datasource: dataSource,
			callback: function(){
				var category = categoryDS.getCurrentElement(),
					params = [waf.wildchar + $(this).val() + waf.wildchar],
					query = 'name = :1';
				
				if(category && category.getKey()){
					params.push(category.getKey());
					query += ' and category.ID = :2';
				}
				dataSource.query(query,{
					params: params
				});
			}
		});
		
		categoryDS.all({
			onSuccess: function(e){
				e.dataSource.select(-1);
			}
		});
		
		document.getElementById(getHtmlId('matrix1')).onselectstart = function(){
			return false;
		}
	// @region namespaceDeclaration// @startlock
	var container4 = {};	// @container
	var button1 = {};	// @button
	var combobox1 = {};	// @combobox
	var container2 = {};	// @container
	var image2 = {};	// @image
	var matrix1 = {};	// @matrix
	// @endregion// @endlock

	// eventHandlers// @lock

	container4.dblclick = function container4_dblclick (event)// @startlock
	{// @endlock
		_ns.Forms.openDialog('addProduct');
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		categoryDS.select(-1);
		dataSource.all();
		getHtmlObj('container1').searchW('clear')
	};// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		if(!this.source.getCurrentElement()){
			return false;
		}
		else if(!this._inited){
			this._inited = true;
			return false;
		}
		
		dataSource.query('category.ID = ' + this.getValue());
	};// @lock

	container2.click = function container2_click (event)// @startlock
	{// @endlock
		dataSource.addNewElement();
		_ns.Forms.openDialog('addProduct');
	};// @lock

	image2.click = function image2_click (event)// @startlock
	{// @endlock
		dataSource.removeCurrent();
	};// @lock

	matrix1.onChildrenDraw = function matrix1_onChildrenDraw (event)// @startlock
	{// @endlock
		var $elem = $(event.htmlObject);
		
		dataSource.category.load({
			onSuccess: function(e){
				if(e.entity){
					$elem.find('.color.waf-matrix-clone').css({
						'background-color' : e.entity.color.getValue()
					});
				}
			}
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_container4", "dblclick", container4.dblclick, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_combobox1", "change", combobox1.change, "WAF");
	WAF.addListener(this.id + "_container2", "click", container2.click, "WAF");
	WAF.addListener(this.id + "_image2", "click", image2.click, "WAF");
	WAF.addListener(this.id + "_matrix1", "onChildrenDraw", matrix1.onChildrenDraw, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
