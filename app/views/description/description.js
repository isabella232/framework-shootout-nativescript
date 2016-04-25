const NCAPModel = require('~/models/ncap');

const ctx = NCAPModel.getEmptyPlaceholder();

const colorRecallContainer = (page, recalls) => {
    recalls = recalls || 0;
    const view = page.getViewById('recallCard');
    if (recalls > 0) {
        view.className = view.className + ' color-warning';
    }
};

exports.onNavigatingTo = args => {
    const page = args.object;

    const {vehicle} = page.navigationContext;
    ctx.set('vehicle', vehicle);

    colorRecallContainer(page, vehicle.RecallsCount);
    page.bindingContext = ctx;
};

