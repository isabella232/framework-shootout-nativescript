var http = require("http");

var apiURL = "http://www.nhtsa.gov/webapi/api/SafetyRatings";
var apiParams = "?format=json&callback=myCallback";

exports.get = function (path) {
    path = path || '';
    var promise = new Promise(function (resolve, reject) {
        http.getJSON(apiURL + path + apiParams).then(function (r) {
            if (r && r.Results && r.Results.length) {
                resolve(r.Results);
            } else {
                reject(new Error("Malformed JSON received."));
            }
        }, function (e) {
            reject(e);
        });
    });

    return promise;
}
