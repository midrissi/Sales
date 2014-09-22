
WAF.onAfterInit = function onAfterInit() {// @lock
	var ns = _ns || {};
	
// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock
	function center(container){
		$$(container).center({center : 'h'});
		$(window).resize(function(){
			$$(container).center({center : 'h'});
		});
	}
	
	(function(ns){
		var baseFolder = '/components/customer/';
		
		ns.Forms = {
			openDialog: function(path){
				var res = baseFolder;
				switch(path){
					case 'viewProduct':
						res += 'productDetails';
						break;
					case 'paymentForm':
						res += 'paypal';
						break;	
					default:
						return false;
				}
				
				$$('dialogCompo').loadComponent({
					path: res + '.waComponent',
					onSuccess: function(){
						$$('mainDialog').displayDialog();
					}
				});
			}
		};
		
		function addCurrentProduct(nb){
			if((typeof nb !== 'undefined' && isNaN(nb)) || nb < 1){
				return;
			}
			
			nb = nb || 1;
			
			var curElement = sources.product.getCurrentElement();
			if(curElement){
				for(var i = 0, prod; prod = cart[i]; i++){
					if(curElement.getKey() == prod.id){
						prod.quantity = typeof(prod.quantity) == 'number'? prod.quantity + nb: nb;
						sources.cart.sync();
						return;
					}
				}
				
				cart.push({
					id: curElement.getKey(),
					name: curElement.name.getValue(),
					quantity: nb,
					price: curElement.price.getValue()
				});
				sources.cart.sync();
			}
		}
		
		ns.addCurrentProduct = addCurrentProduct;
	})(ns);
// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		center('content');
		center('mainDialog');
		
		$$("mainCompo").loadComponent('/components/customer/products.waComponent');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
