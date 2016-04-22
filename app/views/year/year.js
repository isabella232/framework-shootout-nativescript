var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var NCAPModel = require("~/models/ncap");

var ctx = new Observable({
    years: [],
    isLoading: false
});

var loadYears = function () {
    ctx.set('isLoading', true);
    NCAPModel.get().then(function (r) {
        ctx.years = r;
        ctx.set('isLoading', false);
    }, function (err) {
        ctx.set("isLoading", false);
        ctx.makes = [{Make: err.message}];
        throw err;
    })
}

exports.onNavigatingTo = function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = ctx;

    loadYears();
};


exports.gotoYear = function (args) {
    frameModule.topmost().navigate({
        moduleName: 'views/make/make',
        context: {
            year: ctx.years[args.index].ModelYear
        }
    });
}
