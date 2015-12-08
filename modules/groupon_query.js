request = require('request');

g_query = function(url, params, cb) {
  var apiReqUrl;
  apiReqUrl = generateAPIReqUrl("" + url, params);
  return request.get(apiReqUrl, function(err, res, body) {
    if (err) {
      console.log(err, null, null);
    }else
      cb(err, JSON.parse(body), apiReqUrl);
  });
};

generateAPIReqUrl = function(url, params) {
  var fsUrl, key, val;
  fsUrl = url;
  for (key in params) {
    val = params[key];
    if (typeof val !== "undefined" && val) {
      fsUrl += "&" + key + "=" + val;
    }
  }
  return fsUrl;
};

module.exports = g_query