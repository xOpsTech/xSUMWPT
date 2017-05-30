
"use strict";

module.exports = {
    changeKeys: function (jsonMessage) {
        return JSON.parse(JSON.stringify(jsonMessage), function (k, v) {
            if (k.indexOf('.') > -1) {
                let replaced = k.replace(/[. ]/g, '_');
                this[replaced] = v;
            } else {
                return v;
            }
        });
    },
    extractRequiredFields: function (jsonMessage) {
        let messageToReturn = {};
        const requiredMetrics = ['URL', 'loadTime', 'TTFB', 'bytesIn', 'connections', 'domTime', 'fullyLoaded',
            'image_total', 'domElements', 'isResponsive', 'SpeedIndex', 'date', 'firstPaint', 'score_cache', 'score_cdn',
            'score_gzip', 'score_cookies', 'score_keep-alive', 'score_minify', 'score_combine', 'score_compress',
            'score_etags', 'score_progressive_jpeg', 'tester']
        requiredMetrics.map(function (k) {
            messageToReturn[k] = jsonMessage[k];
        });
        // console.log(message);
        messageToReturn['storedTimestamp'] = Math.round(new Date().getTime() / 1000.0);
        return messageToReturn;
    }
}

