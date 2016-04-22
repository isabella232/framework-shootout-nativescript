var Observable = require('data/observable').Observable;
var Model = require("./main-view-model");

var ctx = new Observable({
    years: []
});

exports.onNavigatingTo = function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = ctx;

    Model.getYear().then(function (r) {
        ctx.years = r;
    }, function (err) {
        throw err;
    })
};
