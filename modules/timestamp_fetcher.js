var moment = require('moment');

fetch_date = function(){
	var currentTime = moment().format("DD-MM-YYYY_HH-MM-SS");
	return currentTime;

};

module.exports = fetch_date