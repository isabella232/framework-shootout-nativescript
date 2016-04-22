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
    //console.log(ctx.items[args.index].Make);
};
