request = require('request');
fetchStamp = require('./timestamp_fetcher.js');
jsonFile = require('../deals.json');

// Function to handle POST to Storage Service
ss_post = function(url, data, searchTerm, cb){
	var stringifiedData = JSON.stringify(jsonFile);
	var date = fetchStamp();
	var obj = {searchTerm: searchTerm, date: date, jsonResult: jsonFile};
	return request({
		method: 'POST',
		uri: url,
		body: obj,
		json: true
	}, function (err, resp, body){
		if(err){
			cb(err, null);
		}else{
			cb(null, resp);
		}
	})
};

module.exports = ss_post