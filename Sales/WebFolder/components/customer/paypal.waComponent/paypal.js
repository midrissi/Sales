
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'paypal';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
	var Submit = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	container1.click = function container1_click (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	Submit.click = function Submit_click (event)// @startlock
	{// @endlock
		var credit_card = {};
		
		credit_card.type			= $$(getHtmlId('type')).getValue();
		credit_card.number			= $$(getHtmlId('number')).getValue();
		credit_card.cvv2			= $$(getHtmlId('cvv')).getValue();
		credit_card.expire_month	= $$(getHtmlId('expire_month')).getValue();
		credit_card.expire_year		= $$(getHtmlId('expire_year')).getValue();
		credit_card.first_name		= $$(getHtmlId('first_name')).getValue();
		credit_card.last_name		= $$(getHtmlId('last_name')).getValue();
				
		var payer = {};
		
		payer.payment_method = "credit_card";
		payer.funding_instruments = [{"credit_card": credit_card}];
		
		var transactions = [{
			"amount": {
			"total": "7.47",
			"currency": "USD"
		},
			"description": "This is the payment transaction description."
		}];
		//optional	  
		var redirect_urls  = {return_url: "www.wakanda.org", cancel_url:"www.wakanda.org"}	  
		
	    $$(getHtmlId("loader")).show();
		 $$(getHtmlId("Submit")).hide();
		var response = payment.createAsync({
					onSuccess:function(data)
					{
						if( data.state && data.state == "approved")
						{
							
							if(ds.Order.buy(cart)){
								cart = [];
								sources.cart.sync();
								$$(getHtmlId("loader")).hide();
			 					$$(getHtmlId("Submit")).show();
			 					$$('mainDialog').closeDialog();
								alert('Your order has been registered!');
							}
							else{
								$$(getHtmlId("loader")).hide();
			 					$$(getHtmlId("Submit")).show();
								alert('An error has occured while registring the order!');
							}
						}
						else
						{
							$$(getHtmlId("loader")).hide();
			 					$$(getHtmlId("Submit")).show();
							alert("Payment Error:" + data.details[0].issue)
						}
					},
					params: [{
						    intent: "sale",
						    payer: payer,
						    transactions: transactions,
						    redirect_urls: redirect_urls
						}]
		});
									
	
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_container1", "click", container1.click, "WAF");
	WAF.addListener(this.id + "_Submit", "click", Submit.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
