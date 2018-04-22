/**
 * @file b-popup
 * @author  zhulei05
 * @date 2016-10-26
 */
define(function (require) {
    
    var register = require('../deps/fusion.best');
    var Naboo = require('../deps/naboo');
    var Spark = require('../deps/spark');

    var BPopup = register('b-popup', {
        css: "/*最外层wrapper*/.b-popup-wrapper {  z-index: 900;}/*遮罩*/.b-popup-mask {  display: none;  position: fixed;  left: 0;  top: 0;  opacity: 0;  width: 100%;  height: 100%;  background: rgba(0, 0, 0, 0.5);  z-index: 901;}/*head和content的外层容器*/.b-popup-modal {  display: none;  position: fixed;  left: 0;  width: 100%;  background-color: #fff;  z-index: 902;  margin: 0;  overflow: hidden;  -webkit-transform: translate3d(0, 100%, 0);  transform: translate3d(0, 100%, 0);}/*头部*/.b-popup-head {  font-size: 18px;  margin: 10px 26px;}/*title*/.b-popup-title {  overflow: hidden;  white-space: nowrap;  text-overflow: ellipsis;}/*remove按钮*/.b-popup-remove {  line-height: 17px;  position: absolute;  right: 8px;  top: 10px;}/*内容*/.b-popup-content {  text-align: center;  margin: 0 26px 10px;}",
        tpl: "<div class=\"b-popup-wrapper\">\n    <div class=\"b-popup-modal\">\n        <div class=\"b-popup-head\">\n            <div class=\"b-popup-title\">${title|raw}</div>\n            <div class=\"b-popup-remove c-icon\">&#xe61a</div>\n        </div>\n        <div class=\"b-popup-content\">${content|raw}</div>\n    </div>\n    <div class=\"b-popup-mask\"></div>\n</div>\n",
        props: {
            title: {
                type: String,
                value: '',
                onChange: function () {
                    this.render();
                }
            },
            content: {
                type: String,
                value: '',
                onChange: function () {
                    this.render();
                }
            },
            fullView: {
                type: Boolean,
                value: false
            },
            duration: {
                type: Number,
                value: 400
            },
            direction: {
                type: String,
                value: 'bottom'
            },
            headerStyle: {
                type: Object,
                value: {}
            }
        },
        init: function () {
            Naboo.register('fade', function (next, dom, duration, opacity) {
                Spark.css3(dom, {opacity: opacity}, duration, 'ease', 0, function () {
                    next();
                });
            });
            Naboo.register('slide', function (next, dom, duration, direction, y) {
                switch (direction) {
                    case 'left':
                        var transform = 'translate3d( -' + y + ', 0, 0)';
                        break;
                    case 'right':
                        var transform = 'translate3d(' + y + ', 0, 0)';
                        break;
                    case 'top':
                        var transform = 'translate3d(0, -' + y + ', 0)';
                        break;
                    default:
                        var transform = 'translate3d(0, ' + y + ', 0)';
                }

                var property = {
                    'transform': transform,
                    '-webkit-transform': transform
                };
                Spark.css3(dom, property, duration, 'ease', 0, function () {
                    $(dom).css({
                        'transform': 'none',
                        '-webkit-transform': 'none'
                    });
                    next();
                });
            });

            var _this = this;
            $(this.element).on('click', '.b-popup-mask,.b-popup-remove', function () {
                _this.close();
            }).on('touchmove', '.b-popup-content', function (e) {
                e.stopPropagation();
            });
        },
        open: function () {
            var _this = this;
            var wHeight = $(window).height();
            var $mask = this.$('.b-popup-mask');
            var $modal = this.$('.b-popup-modal');

            var fullView = this.getProp('fullView');

            if (fullView || $modal.height() > wHeight) {
                $modal.height('100%');
            }

            var headerStyle = this.getProp('headerStyle');
            if (headerStyle && (fullView || $modal.height() >= wHeight)) {
                $modal.find('.b-popup-head').css({
                    'background-color': headerStyle.bg,
                    'color': headerStyle.color
                });
            }
            
            $mask.show();

            var direction = this.getProp('direction');

            switch (direction) {
                case 'top':
                    // 针对 superframe 页面特殊处理
                    if ($('#sfa-head').length && !fullView) {
                        $mask.css('z-index', '498');
                        $modal.css({
                            'z-index': '499',
                            'top': '44px!important'
                        });
                    }
                    $modal.css({
                        'top': 0,
                        'transform': 'translate3d(0, -100%, 0)',
                        '-webkit-transform': 'translate3d(0, -100%, 0)'
                    });
                    break;
                case 'left':
                    $modal.css({
                        'bottom': 0,
                        'transform': 'translate3d(-100%, 0, 0)',
                        '-webkit-transform': 'translate3d(-100%, 0, 0)'
                    });
                    break;
                case 'right':
                    $modal.css({
                        'bottom': 0,
                        'transform': 'translate3d(100%, 0, 0)',
                        '-webkit-transform': 'translate3d(100%, 0, 0)'
                    });
                    break;
                default:
                    $modal.css({
                        'bottom': 0,
                        'transform': 'translate3d(0, 100%, 0)',
                        '-webkit-transform': 'translate3d(0, 100%, 0)'
                    });
            }

            $modal.show();
            var duration = this.getProp('duration');
            Naboo.p(Naboo.fade($mask.get(0), duration, 1), Naboo.slide($modal.get(0), duration, direction, '0')).start(function () {
                _this.trigger('opened');
            });
        },
        close: function () {
            var _this = this;
            var $mask = this.$('.b-popup-mask');
            var $modal = this.$('.b-popup-modal');
            var duration = this.getProp('duration');
            var direction = this.getProp('direction');
            Naboo.p(Naboo.fade($mask.get(0), duration, 0), Naboo.slide($modal.get(0), duration, direction, '100%')).start(function () {
                $mask.hide();
                $modal.hide();
                _this.trigger('closed');
            });
        },
        detached: function () {
            Spark.dispose();
        }
    });

    return BPopup;
});
