﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'main';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var
		$tabCont	= getHtmlObj('container1'),
		webcompo	= $$(getHtmlId('component1')),
		baseFolder	= _ns.components.getPath('admin.tabs'),
		mapObj 		= {
			'customers' : {
				widgetID : 'container2',
				current : 'customers'
			},
			'sales' : {
				widgetID : 'container3',
				current : 'sales'
			},
			'products' : {
				widgetID : 'container4',
				current : 'products'
			}
		};
		
		function setTab(tab){
			if(!mapObj[tab]){
				return false;
			}
			
			$comp.sourcesVar.currentTab = {
				widget: $$(getHtmlId(mapObj[tab].widgetID)),
				current: mapObj[tab].current
			}
			
			$comp.sources.currentTab.sync();
		}

	// @region namespaceDeclaration// @startlock
	var container4 = {};	// @container
	var container3 = {};	// @container
	var currentTabEvent = {};	// @dataSource
	var container2 = {};	// @container
	// @endregion// @endlock

	// eventHandlers// @lock

	container4.click = function container4_click (event)// @startlock
	{// @endlock
		setTab('products');
	};// @lock

	container3.click = function container3_click (event)// @startlock
	{// @endlock
		setTab('sales');
	};// @lock

	currentTabEvent.onCurrentElementChange = function currentTabEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var
		current 	= window[getHtmlId('currentTab')];
		
		$tabCont.find('.selected').removeClass('selected');
		current.widget.addClass('selected');
		webcompo.loadComponent(baseFolder + current.current + '.waComponent' );
	};// @lock

	container2.click = function container2_click (event)// @startlock
	{// @endlock
		setTab('customers');
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_container4", "click", container4.click, "WAF");
	WAF.addListener(this.id + "_container3", "click", container3.click, "WAF");
	WAF.addListener(this.id + "_currentTab", "onCurrentElementChange", currentTabEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_container2", "click", container2.click, "WAF");
	// @endregion// @endlock
		setTab('customers');
	};// @lock


}// @startlock
return constructor;
})();// @endlock
