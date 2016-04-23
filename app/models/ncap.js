const http = require('http');
const Observable = require('data/observable').Observable;

const apiURL = 'http://www.nhtsa.gov/webapi/api/SafetyRatings';
const apiParams = '?format=json&callback=myCallback';

exports.getEmptyPlaceholder = () => new Observable({
    items: [],
    isLoading: false
});

exports.get = path => {
    path = path ? encodeURI(path) : '';
    const promise = new Promise((resolve, reject) => {
        http.getJSON(apiURL + path + apiParams).then(r => {
            if (r && r.Results && r.Results.length) {
                resolve(r.Results);
            } else {
                reject(new Error('Malformed JSON received.'));
            }
        }, e => {
            reject(e);
        });
    });

    return promise;
};
