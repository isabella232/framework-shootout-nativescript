const NCAPModel = require('~/models/ncap');

const ctx = NCAPModel.getEmptyPlaceholder();

exports.onNavigatingTo = args => {
    const page = args.object;
    page.bindingContext = ctx;

    const {vehicleID, vehicleDesc} = page.navigationContext;

    loadVehicle(vehicleID);
};

const loadVehicle = (vehicleID) => {
    ctx.set('isLoading', true);
    return NCAPModel.get('/VehicleId/' + vehicleID).then(r => {
        ctx.set('vehicle', r[0]);
        ctx.set('isLoading', false);
    }, err => {
        ctx.set('isLoading', false);
        ctx.set('vehicle', {VehicleDescription: err.message});
        throw err;
    });
    loadToContext(ctx, '/VehicleId/' + vehicleID).then(() => {
        ctx.set('vehicle', ctx.items[0]);
    });
};
