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

module.exports = generateAPIReqUrl