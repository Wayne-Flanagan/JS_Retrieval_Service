var express = require('express');
var router = express.Router();

var config = require('../config.json');
var g_url = config.groupon.url;
var client_id = config.groupon.client_id;
var url_string = g_url + 'client_id=' + client_id;
var grouponQuery = require('../modules/groupon_query.js');

var storage_service_url = config.storage_service.url;
var storage_post = require('../modules/storage_service_post.js');

var deals = require('../deals.json');

/* Service accepts a GET request. */
router.get('/', function(req, res, next) {
	// Service behaviour when hit with a GET request.
	// Extract query params from request and add to object for generating URL to query Groupon API
	var grpn_params = {};
	grpn_params.channel_id = req.query.channel;
	grpn_params.division_id = req.query.division;
	var searchTerm = 'channel_id = ' + grpn_params.channel_id + ' division_id = ' + grpn_params.division_id;
	// Delegate Groupon API query to independent module that uses Node "Request" module to handle HTTP GET request
	grouponQuery(url_string, grpn_params, function(err, resp){
		// Delegate Storage query to independent module that uses Node "Request" module to handle HTTP POST request
		storage_post(storage_service_url, resp, searchTerm, function(err, resp){
			if(err){
				console.log(err);
			}else{
				console.log(resp);
			}
		});
		for(var i = 0; i < resp.deals.length; i++){
			if(resp.deals[i].expiresInDays == null){
				resp.deals[i].expiresInDays = Math.floor((Math.random() * 10) + 1);
			}

		}
		// Return the JSON Data from Groupon API to the Diplay Service
		res.json(resp);
	})

});
module.exports = router;