/**
 * @file b-scroll
 * @author zhulei05
 * @date 2016-10-25
 */

define(function (require) {
    
    var register = require('../deps/fusion.best');
    var BDScroll = require('./bdscroll');
    var Scroll = require('./scroll');

    var originScroll = Scroll;
    var BScroll = register('b-scroll', {
        props: {
            snap: {
                type: Boolean,
                value: false
            },
            momentum: {
                type: Boolean,
                value: false
            }
        },
        holdChild: true,
        scroll: null,
        init: function () {
            Scroll = originScroll;
            var _this = this;
            var momentum = this.getProp('momentum');
            var snap = this.getProp('snap');
            var el = this.$('.c-scroll-wrapper').get(0);
            var opt = {
                snap: snap,
                momentum: momentum
            };
            var $indicator = this.$('.c-scroll-indicator');
            if ($indicator.length > 0) {
                opt.$indicator = $indicator;
            }
            if (snap || momentum) {
                // 如果需要分页或者滑动势能功能，则必须使用bdscroll
                // bdscroll是对iscroll的封装
                Scroll = BDScroll;
            }

            var scroll = new Scroll(el, opt);
            this.scroll = scroll;
            scroll.on('scrollEnd', function () {
                _this.trigger('scrollEnd', scroll);
            });
        }
    });

    return BScroll;
});
