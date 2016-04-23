const NCAPModel = require('~/models/ncap');

const ctx = NCAPModel.getEmptyPlaceholder();

exports.onNavigatingTo = args => {
    const page = args.object;

    const {vehicleID, vehicleDesc} = page.navigationContext;

    const promise = loadVehicle(vehicleID);

    ctx.getField = field => {
        return promise.then(() => {
            return ctx.vehicle[field];
        }, err => {
            throw err;
        });
    };

    page.bindingContext = ctx;
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
};

exports.getField = () => {
}
