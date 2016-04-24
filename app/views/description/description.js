const NCAPModel = require('~/models/ncap');

const ctx = NCAPModel.getEmptyPlaceholder();

exports.onNavigatingTo = args => {
    const page = args.object;

    const {vehicle} = page.navigationContext;
    ctx.set('vehicle', vehicle);

    page.bindingContext = ctx;
};
