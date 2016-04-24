const frameModule = require('ui/frame');
const NCAPModel = require('~/models/ncap');

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

exports.gotoDescription = args => {
    const {VehicleId} = ctx.items[args.index];
    ctx.set('isLoading', true);
    NCAPModel.get('/VehicleId/' + VehicleId).then(res => {
        ctx.set('isLoading', false);
        frameModule.topmost().navigate({
            moduleName: 'views/description/description',
            context: {
                vehicle: res[0]
            }
        });
    }, err => {
        ctx.set('isLoading', false);
        throw err;
    });
};
