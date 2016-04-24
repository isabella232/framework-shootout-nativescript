const NCAPModel = require('~/models/ncap');
const navigateWithData = require('~/utils/navigateWithData');

const ctx = NCAPModel.getEmptyPlaceholder();

exports.onNavigatingTo = args => {
    const page = args.object;
    if (args.isBackNavigation) {
        return;
    }
    page.bindingContext = ctx;

    const {items} = page.navigationContext;
    ctx.set('items', items);
};

exports.gotoVehicles = args => {
    const {ModelYear, Make, Model} = ctx.items[args.index];
    return navigateWithData(ctx, '/modelyear/' + ModelYear +'/make/' + Make + '/model/' + Model, 'views/vehicle/vehicle');
};
