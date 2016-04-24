const NCAPModel = require('~/models/ncap');
const navigateWithData = require('~/utils/navigateWithData');

const ctx = NCAPModel.getEmptyPlaceholder();

const loadYearData = () => {
    ctx.set('isLoading', true);
    return NCAPModel.get('').then(r => {
        ctx.set('items', r);
        ctx.set('isLoading', false);
    }, err => {
        ctx.set('isLoading', false);
        ctx.set('items', [{Model: err.message}]);
        throw err;
    });
};

exports.onNavigatingTo = args => {
    const page = args.object;
    if (args.isBackNavigation) {
        return;
    }
    page.bindingContext = ctx;

    loadYearData();
};

exports.gotoMakes = args => {
    const year = ctx.items[args.index].ModelYear;
    return navigateWithData(ctx, '/modelyear/' + year, 'views/make/make');
};
