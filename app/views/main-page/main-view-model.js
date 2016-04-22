var http = require("http");

function getYear () {
    var promise = new Promise(function (resolve, reject) {
        http.getJSON("http://www.nhtsa.gov/webapi/api/SafetyRatings?format=json&callback=mytesting").then(function (r) {
            if (r && r.Results && r.Results.length) {
                resolve(r.Results);
            } else {
                reject(new Error('Malformed JSON received.'));
            }
        }, function (e) {
            reject(e);
        });
    });

    return promise;
}

exports.getYear = getYear;
exports.getDefaultYears = function () {
    var result = [];
    for (var i = 2016; i > 1990; i--) {
        result.push({ModelYear: i});
    }

    return result;
}
