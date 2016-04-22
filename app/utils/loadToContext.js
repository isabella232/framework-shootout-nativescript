const NCAPModel = require('~/models/ncap');

module.exports = (context, url) => {
    context.set('isLoading', true);
    NCAPModel.get(url).then(r => {
        context.set('items', r);
        context.set('isLoading', false);
    }, err => {
        context.set('isLoading', false);
        context.set('items', [{Model: err.message}]);
        throw err;
    });
};
