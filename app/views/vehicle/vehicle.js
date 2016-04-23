const frameModule = require('ui/frame');
const NCAPModel = require('~/models/ncap');
const loadToContext = require('~/utils/loadToContext');

const ctx = NCAPModel.getEmptyPlaceholder();

exports.onNavigatingTo = args => {
    const page = args.object;
    page.bindingContext = ctx;

    const {year, make, model} = page.navigationContext;
    loadToContext(ctx, '/modelyear/' + year +'/make/' + make + '/model/' + model);
};

exports.gotoDescription = args => {
    frameModule.topmost().navigate({
        moduleName: 'views/description/description',
        context: {
            vehicleID: ctx.items[args.index].VehicleId,
            vehicleDesc: ctx.items[args.index].VehicleDescription
        }
    });
};
