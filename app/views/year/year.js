const frameModule = require('ui/frame');
const NCAPModel = require('~/models/ncap');
const loadToContext = require('~/utils/loadToContext');

const ctx = NCAPModel.getEmptyPlaceholder();

exports.onNavigatingTo = args => {
    const page = args.object;
    page.bindingContext = ctx;

    loadToContext(ctx, '');
};

exports.gotoMakes = args => {
    frameModule.topmost().navigate({
        moduleName: 'views/make/make',
        context: {
            year: ctx.items[args.index].ModelYear
        }
    });
};
