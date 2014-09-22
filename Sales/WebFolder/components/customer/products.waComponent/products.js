
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'teachers';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		function matrixToArray(matrix) {
		    return matrix.substr(7, matrix.length - 8).split(', ');
		}
		
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
		
		// Drag and drop
		var
		$products	= $('#' + getHtmlId('matrix1') + ' .waf-matrix-element'),
		$cart		= getHtmlObj('dataGrid1'),
		cartSource	= sources.cart;
		
		function increment(inc, nb){
			var position = cartSource.getPosition();
			
			nb = nb || 1;
			
			if(position >= 0){
				cart[position].quantity += (inc === false?-nb:nb);
			}
			
			if(cart[position].quantity <= 0){
				cartSource.removeCurrent();
			}
			
			cartSource.sync();
		}
				
		$cart.droppable({
		    drop: function(){
		        _ns.addCurrentProduct();
		    }
		});
		
		$products.liveDraggable({
		    start: function(e, ui){
		    	var $el = $('#clone-' + ui.helper.data('ref') + '-' + ui.helper.data('area')),
		    		pos = matrixToArray($el.css("-webkit-transform"));
		    		
		    	$(ui.helper).css("margin-left", -parseInt(pos[4]));
                $(ui.helper).css("margin-top", -parseInt(pos[5]));
		    },
		    appendTo: "body",
		    cursor: 'move',
		    cursorAt: { left: 5 },
		    scroll: false,
		    helper: "clone",
		    zIndex: 888888
		});
		
		$cart
		.find('.waf-toolbar')
		.show()
		.find('.waf-toolbar-element ').unbind('click').click(function(e){
			//e.preventDefault();
			switch($(this).attr('title')){
				case 'Add':
					increment();
					break;
				case 'Delete':
					increment(false);
					break;
			}
			
			return false;
		});
	// @region namespaceDeclaration// @startlock
	var dataGrid1 = {};	// @dataGrid
	var image2 = {};	// @image
	var button2 = {};	// @button
	var cartEvent = {};	// @dataSource
	var container4 = {};	// @container
	var button1 = {};	// @button
	var combobox1 = {};	// @combobox
	var matrix1 = {};	// @matrix
	// @endregion// @endlock

	// eventHandlers// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		sources.product.selectByKey(sources.cart.id, {
			onSuccess: function(e){
				_ns.Forms.openDialog('viewProduct');
			}
		});
	};// @lock

	image2.click = function image2_click (event)// @startlock
	{// @endlock
		_ns.addCurrentProduct();
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		if(waf.directory.currentUserBelongsTo('customer')){
			//_ns.Forms.openDialog('paymentForm');
			if(ds.Order.buy(cart)){
				cart = [];
				sources.cart.sync();
				
				alert('Your order has been registered!');
			}
			else{
				alert('An error has occured while registring the order!');
			}
		}
		else{
			$$('login1').showLoginDialog();
		}
	};// @lock

	cartEvent.onCollectionChange = function cartEvent_onCollectionChange (event)// @startlock
	{// @endlock
		var total = 0;
		for(var i = 0, prod; prod = cart[i]; i++){
			total += prod.price*prod.quantity;
		}
		
		$comp.sourcesVar.total = total + ' $';
		$comp.sources.total.sync();
		
		if(cart.length == 0){
			getHtmlObj('button2').hide();
		}
		else{
			getHtmlObj('button2').show();
		}
	};// @lock

	container4.dblclick = function container4_dblclick (event)// @startlock
	{// @endlock
		_ns.Forms.openDialog('viewProduct');
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
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_image2", "click", image2.click, "WAF");
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener("cart", "onCollectionChange", cartEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_container4", "dblclick", container4.dblclick, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_combobox1", "change", combobox1.change, "WAF");
	WAF.addListener(this.id + "_matrix1", "onChildrenDraw", matrix1.onChildrenDraw, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
