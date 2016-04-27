const frameModule = require('ui/frame');

exports.goBack = () => {
    frameModule.topmost().goBack();
};
