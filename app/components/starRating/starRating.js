const ViewModule = require('ui/core/view');
const LabelModule = require('ui/label');
const observableArray = require('data/observable-array');

/* Using font-awesome */
const starCodes = {
    full: 0xf005,
    half: 0xf123,
    empty: 0xf006
};

const getStar = type => {
    const star = new LabelModule.Label();
    star.text = String.fromCharCode(starCodes[type] || starCodes.empty);
    star.className = 'icon-fa';

    return star;
};

exports.onLoad = args => {

    const obj = args.object;

    const container = obj.getViewById('starContainer');
    container.removeChildren();

    const notRatedLabel = new LabelModule.Label();
    notRatedLabel.text = obj.rating;

    const rating = parseFloat(obj.rating);

    if (isNaN(rating)) {
        container.addChild(notRatedLabel);
        return;
    }

    const total = parseInt(obj.total, 10) || Math.ceil(rating / 5) * 5;
    const fullRating = Math.floor(rating);
    let partialRating = 0;

    if (fullRating !== rating) {
        partialRating = 1; // used to show partial stars for x.5 ratings
    }

    const stars = [];

    for (let i = 1; i <= fullRating; i++) {
        container.addChild(getStar('full'));
    }

    for (let i = 1; i <= partialRating; i++) {
        container.addChild(getStar('half'));
    }

    for (let i = 1; i <= (total - fullRating - partialRating); i++) {
        container.addChild(getStar('empty'));
    }
};
