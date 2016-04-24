const NCAPModel = require('~/models/ncap');
const frameModule = require('ui/frame');

module.exports = (context, url, destination) => {
    context.set('isLoading', true);
    return NCAPModel.get(url).then(res => {
        context.set('isLoading', false);
        frameModule.topmost().navigate({
            moduleName: destination,
            context: {
                items: res
            }
        });
    }, err => {
        context.set('isLoading', false);
        throw err;
    });
};
