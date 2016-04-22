var Observable = require("data/observable").Observable;
var NCAPModel = require("~/models/ncap");

var ctx = new Observable({
    makes: [],
    isLoading: false
});

var loadMakes = function (year) {
    ctx.set("isLoading", true);
    NCAPModel.get("/modelyear/" + year).then(function (r) {
        ctx.makes = r;
        ctx.set("isLoading", false);
    }, function (err) {
        ctx.set("isLoading", false);
        ctx.makes = [{Make: err.message}];
        throw err;
    })
};

exports.onNavigatingTo = function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = ctx;

    loadMakes(page.navigationContext.year);
};

exports.gotoMake = function (args) {
    console.log(ctx.makes[args.index].Make);
}
