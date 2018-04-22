/**
 * @file b-grouplist-sticky
 * @author yaochang@baidu.com
 */

define(function (require) {

    var register = require('../deps/fusion.best');
    var detect = require('../deps/detect');

    var BGrouplistSticky = register('b-grouplist-sticky', {
        props: {
            list: {
                type: Array,
                value: [],
                onChange: function () {
                    this.render();
                }
            },
            top: {
                type: Number,
                value: 0
            },
            id: {
                type: String,
                value: ''
            }
        },
        holdChild: true,
        preprocess: function () {
            var options = {};
            options.top = this.getProp('top');
            options.id = this.getProp('id');
            options.$wrapper = $('#' + options.id);

            if (detect.os.n === 'ios'
                && options.$wrapper.length
                && options.top
            ) {
                options.top = 0;
            }

            options.$wrapper = options.$wrapper.length
                ? options.$wrapper : $(window);

            options.FIXED_CLASS = 'b-grouplist-sticky-fixed';
            options.$title = this.$('.b-grouplist-sticky-title');
            options.$titleShadow = this.$('.b-grouplist-sticky-title-shadow');
            options.offsetList = [];
            for (var i = 0, len = options.$title.length; i < len; i++) {
                options.offsetList.push(options.$title.eq(i).offset().top - options.top);
            }
            options.titleHeight = options.$title.height();
            options.length = options.$title.length;

            this.options = options;
        },

        /**
         * 判断是否支持 sticky 属性
         *
         * @private
         * @return {boolean} isSticky 是否支持 CSS sticky 属性
         */
        isSupportSticky: function () {
            var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
            var stickyText = '';
            for (var i = 0; i < prefixTestList.length; i++) {
                stickyText += 'position:' + prefixTestList[i] + 'sticky;';
            }
            // 创建一个dom来检查
            var div = document.createElement('div');
            div.style.cssText = 'display:none;' + stickyText;
            document.body.appendChild(div);
            var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
            document.body.removeChild(div);
            div = null;
            return isSupport;
        },

        /**
         * 获取当前需要置顶的 title
         *
         * @private
         * @param {number} scrollTop 当前文档滚动高度
         * @return {number} i 当前 title 的 index
         */
        getCurIndex: function (scrollTop) {
            var offsetList = this.options.offsetList;

            for (var i = offsetList.length - 1; i >= 0; i--) {
                if (scrollTop >= offsetList[i]) {
                    return i;
                }
            }
            return -1;
        },

        /**
         * 恢复所有 title 默认位置
         *
         * @private
         */
        resetPosition: function () {
            var options = this.options;

            options.$title.removeClass(options.FIXED_CLASS);
            options.$titleShadow.hide();
        },

        /**
         * 设置 title 置顶
         *
         * @private
         * @param {number} curIndex 当前 title 的 index
         */
        setSticky: function (curIndex) {
            var options = this.options;
            var FIXED_CLASS = options.FIXED_CLASS;
            var $title = options.$title;
            var $titleShadow = options.$titleShadow;

            $title.removeClass(FIXED_CLASS);
            $titleShadow.hide();
            if (curIndex >= 0) {
                $title.eq(curIndex).addClass(FIXED_CLASS);
                $titleShadow.eq(curIndex).show();
                if (options.top) {
                    $title.eq(curIndex).css('top', options.top + 'px');
                }
            }
        },

        /**
         * init
         *
         * @public
         */
        init: function () {
            var self = this;

            self.preprocess();

            var options = self.options;
            var top = options.top;
            var $wrapper = options.$wrapper;

            // if (self.isSupportSticky()) {
            //     if (top) {
            //         options.$title.css('top', top + 'px');
            //     }
            //     return;
            // }
            // else {
            //     options.$title.css('position', 'static');
            // }

            var scrollTop = $wrapper.scrollTop();
            var prevIndex = -1;
            var curIndex = self.getCurIndex(scrollTop);

            // 初始化时设置符合条件的 title 吸顶
            self.setSticky(curIndex);

            // 监听 scroll 事件设置吸顶
            $wrapper.on('scroll resize', function () {
                scrollTop = $wrapper.scrollTop();
                curIndex = self.getCurIndex(scrollTop);

                if (curIndex < 0) {
                    self.resetPosition();
                    prevIndex = curIndex;
                    return;
                }

                // 只有 index 变化时，才更新吸顶 title
                if (curIndex !== prevIndex) {
                    self.setSticky(curIndex);
                    prevIndex = curIndex;
                }

                // 设置 title 切换时的过渡效果
                var nextIndex = curIndex + 1;
                if (nextIndex < options.length
                    && scrollTop + options.titleHeight >= options.offsetList[nextIndex]
                ) {
                    var transitionY = options.offsetList[nextIndex] - scrollTop - options.titleHeight;

                    options.$title.eq(curIndex).css({
                        '-webkit-transform': 'translateY(' + transitionY + 'px)',
                        'transform': 'translateY(' + transitionY + 'px)'
                    });
                }
            });

            window.requestAnimationFrame = window.requestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.webkitRequestAnimationFrame
                || function (fn) {
                    setTimeout(fn, 1000 / 60);
                };

            function step() {
                var scrollTop = $wrapper.scrollTop();
                var curIndex = self.getCurIndex(scrollTop);

                if (curIndex < 0) {
                    self.resetPosition();
                }
                requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }
    });

    return BGrouplistSticky;
});
