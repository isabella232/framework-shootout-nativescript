const frameModule = require('ui/frame');
const NCAPModel = require('~/models/ncap');
const loadToContext = require('~/utils/loadToContext');

const ctx = NCAPModel.getEmptyPlaceholder();

exports.onNavigatingTo = args => {
    const page = args.object;
    page.bindingContext = ctx;

    const {year, make} = page.navigationContext;
    loadToContext(ctx, '/modelyear/' + year + '/make/' + make);
};

exports.gotoVehicles = args => {
    frameModule.topmost().navigate({
        moduleName: 'views/vehicle/vehicle',
        context: {
            year: ctx.items[args.index].ModelYear,
            make: ctx.items[args.index].Make,
            model: ctx.items[args.index].Model
        }
    });
    //console.log(ctx.items[args.index].Make);
};
