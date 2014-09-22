var utils = {};

var base64 = require('wak-paypal/base64').Base64;
var config = require('wak-paypal/config').config;


function paypal(env, client_id, secret) {
    this.environement 	= env ? env : "sandbox"; //by default setup the endpoint to sandbox
    this.version 		= 'v1';
    this.client_id 		= client_id ? client_id : config.client_id;
    this.secret 		= secret ? secret : config.secret;

    this.accessToken = "";

    var parent = this;

    this.payments = {

        parent: parent,

        create: function(intent, payer, transactions, redirect_urls) {
            //debugger;
            if (!parent.accessToken || parent.accessToken == "") {
                parent.getAccessToken();
            }
            var headers = [];

            headers.push({
                header: "Authorization",
                value: "Bearer " + parent.accessToken
            });
            headers.push({
                header: "Content-Type",
                value: "application/json"
            });

            var body = {};

            body.intent = intent;
            body.payer = payer;
            body.transactions = transactions;
            body.redirect_urls = redirect_urls;
            body = JSON.stringify(body);
            var response = parent.sendPaypalRequest("POST", "payment", "payments", headers, body);

            return response;

        },

        execute: function(payer_id, payment_id) {
            //debugger;
            if (!parent.accessToken || parent.accessToken == "") {
                parent.getAccessToken();
            }
            var headers = [];

            headers.push({
                header: "Authorization",
                value: "Bearer " + parent.accessToken
            });
            headers.push({
                header: "Content-Type",
                value: "application/json"
            });

            var body = {};

            body.payer_id = payer_id;

            body = JSON.stringify(body);
            var response = parent.sendPaypalRequest("POST", "payment/" + payment_id + "/execute", "payments", headers, body);

            return response;

        },

        lookup: function(payment_id) {
            //debugger;
            if (!parent.accessToken || parent.accessToken == "") {
                parent.getAccessToken();
            }
            var headers = [];

            headers.push({
                header: "Authorization",
                value: "Bearer " + parent.accessToken
            });
            headers.push({
                header: "Content-Type",
                value: "application/json"
            });

            body = {};

            var response = parent.sendPaypalRequest("GET", "payment/" + payment_id, "payments", headers, body);

            return response;

        },

        list: function(payment_id) {
            //debugger;
            if (!parent.accessToken || parent.accessToken == "") {
                parent.getAccessToken();
            }
            var headers = [];

            headers.push({
                header: "Authorization",
                value: "Bearer " + parent.accessToken
            });
            headers.push({
                header: "Content-Type",
                value: "application/json"
            });

            body = {};

            var response = parent.sendPaypalRequest("GET", "payment", "payments", headers, body);

            return response;

        },

        sale: function(sale_id) {
            //debugger;
            if (!parent.accessToken || parent.accessToken == "") {
                parent.getAccessToken();
            }
            var headers = [];

            headers.push({
                header: "Authorization",
                value: "Bearer " + parent.accessToken
            });
            headers.push({
                header: "Content-Type",
                value: "application/json"
            });

            body = {};

            var response = parent.sendPaypalRequest("GET", "sale/" + sale_id, "payments", headers, body);

            return response;

        },

        refund: function(sale_id, amount, currency, fee) {
            //debugger;
            if (!parent.accessToken || parent.accessToken == "") {
                parent.getAccessToken();
            }
            var headers = [];

            headers.push({
                header: "Authorization",
                value: "Bearer " + parent.accessToken
            });
            headers.push({
                header: "Content-Type",
                value: "application/json"
            });

            body = {};
            body.amount = {};
            body.amount.total = amount;
            body.amount.currency = currency;
            body.amount.details = {};
            body.amount.details.fee = fee;

            var response = parent.sendPaypalRequest("POST", "sale/" + sale_id + "/refund", "payments", headers, body);

            return response;

        },

        refundDeails: function(refund_id) {
            //debugger;
            if (!parent.accessToken || parent.accessToken == "") {
                parent.getAccessToken();
            }
            var headers = [];

            headers.push({
                header: "Authorization",
                value: "Bearer " + parent.accessToken
            });
            headers.push({
                header: "Content-Type",
                value: "application/json"
            });

            var body = {};

            var response = parent.sendPaypalRequest("GET", "refund/" + refund_id, "payments", headers, body);

            return response;

        }
    };




};





paypal.prototype.getAccessToken = function() {
    if (!this.accessToken || this.accessToken == "") {

        var headers = [];
        var auth = base64.encode(this.client_id + ":" + this.secret);

        headers.push({
            header: "Accept",
            value: "application/json"
        });
        headers.push({
            header: "Accept-Language",
            value: "en_US"
        });
        headers.push({
            header: "Authorization",
            value: "Basic " + auth
        });
        headers.push({
            header: "Content-Type",
            value: "application/x-www-form-urlencoded"
        });
        var body = "grant_type=client_credentials";

        var response = this.sendPaypalRequest("POST", "token", "oauth2", headers, body);
        if (!response.error) {
            this.accessToken = response.access_token;
        }
        return response;
    }
}





/**
	Helpers methods
**/

paypal.prototype.sendPaypalRequest = function(type, action, resource, headers, body) {
    try {
        var xhr = new XMLHttpRequest();

        var url = config.endpoint[this.environement] + '/' + this.version + '/' + resource + '/' + action;
        var response;

        xhr.open(type, url, false);

        for (var h in headers) {
            xhr.setRequestHeader(headers[h].header, headers[h].value);
        }

        xhr.send(body);

        if (xhr.readyState == 4) {

            response = JSON.parse(xhr.responseText);

        }
        return response;

    }
    catch (e) {
        return e;
    }
}



exports.Paypal = paypal;