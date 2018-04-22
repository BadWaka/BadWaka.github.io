/**
 * @file citySelect
 */
define(function (require) {

    /**
     * 城市选择
     *
     * @public
     * @param {Object} options options
     * @param {string} options.path citylist模块路径 optional
     * @param {Function} options.selectedCallback 选择城市以后触发回调 optional
     * @param {Function} options.closedCallback 关闭城市选择面板以后触发回调 optional
     */
    var citySelect = function (options) {

        var selectedCallback = options.selectedCallback;
        var closedCallback = options.closedCallback;
        delete options.selectedCallback;
        delete options.closedCallback;

        var BCity = require('./b-city');
        var city = new BCity();
        var ele = city.element;
        $(ele).attr(options);
        $('body').append(ele);

        city.fusionCityReady = function () {
            city.open();
        };

        $(ele).on('selected', function (e, info) {
            if (typeof selectedCallback === 'function') {
                selectedCallback(info);
            }
        }).on('closed', function () {
            $(ele).remove();
            if (typeof closedCallback === 'function') {
                closedCallback();
            }
        });
    };

    return citySelect;
});
