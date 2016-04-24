const ViewModule = require('ui/core/view');
const ImageSourceModule = require('image-source');
const ImageModule = require('ui/image');
const LabelModule = require('ui/label');
const ActivityIndicatorModule = require('ui/activity-indicator');

exports.onLoad = args => {

    const obj = args.object;

    const container = obj.getViewById('imageContainer');
    container.removeChildren();
    const indicator = new ActivityIndicatorModule.ActivityIndicator();
    indicator.busy = true;

    const image = new ImageModule.Image();

    const label = new LabelModule.Label();

    container.addChild(indicator);

    ImageSourceModule.fromUrl(obj.imgSrc).then(res => {
        image.imageSource = res;
        container.addChild(image);
        container.removeChild(indicator);
    }, err => {
        if (obj.imgTitle) {
            label.text = `${obj.imgTitle} picture cannot be loaded`;
            container.addChild(label);
        }
        container.removeChild(indicator);
    });
};
