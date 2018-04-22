/**
 * @file 图片轮播组件
 * @author  liuyan29
 * @date 2017-03-30
 */
/* globals Modernizr, DocumentTouch */
/* eslint-disable fecs-camelcase, max-len */

define(['../deps/fusion.best'], function (register) {
    var BCarousel = register('b-carousel', {
        tpl: "<div class=\"b-carousel-wrapper\">\n    <ul class=\"b-carousel-scroller\">\n        <% for: ${list} as ${item}, ${index} %>\n            <li>\n                <a href=\"${item.href}\">\n                    <% if: ${list.length} === 1 %>\n                        <img src=\"${item.src}\" alt=\"${item.alt}\">\n                    <% else %>\n                        <img data-imagedelaysrc=\"${item.src}\" alt=\"${item.alt}\">\n                    <% /if %>\n                </a>\n                <% if: ${item.title} %>\n                    <h3 class=\"b-carousel-title<% if: ${hasTitleBg} %> b-carousel-title-bg<% /if %>\">${item.title}</h3>\n                <% /if %>\n            </li>\n            <% /for %>\n    </ul>\n    <% if: ${hasIndicator} %>\n    <div class=\"b-carousel-indicator\">\n        <% for: ${list} as ${item}, ${index} %>\n            <span></span>\n        <% /for %>\n    </div>\n    <% /if %>\n</div>\n",
        css: ".b-carousel-wrapper {  height: 1.65rem;  position: relative;  overflow: hidden;  margin: 0 auto;}.b-carousel-wrapper:after {  content: \"\";  display: block;  width: 100%;  padding-top: 50%;}.b-carousel-wrapper ul {  position: absolute;  left: 0;  top: 0;  width: 100%;  height: 100%;}.b-carousel-wrapper li {  list-style: none;  position: absolute;  left: 0;  top: 0;  width: 100%;  height: 100%;}.b-carousel-wrapper li:first-child {  z-index: 1;}.b-carousel-wrapper li img {  position: absolute;  left: 0;  top: 0;  width: 100%;  height: 100%;  border: none;}.b-carousel-wrapper li .b-carousel-title {  position: absolute;  left: 0;  bottom: 0;  -webkit-box-sizing: border-box;  -moz-box-sizing: border-box;  box-sizing: border-box;  padding: 0 1rem 0 .17rem;  width: 100%;  height: .38rem;  line-height: 2.7;  font-size: .14rem;  font-weight: 400;  color: #fff;  overflow: hidden;  white-space: nowrap;  text-overflow: ellipsis;}.b-carousel-title-bg {  background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));}.b-carousel-indicator {  position: absolute;  right: .16rem;  bottom: .16rem;  z-index: 5;  font-size: 0;  line-height: 1;}.b-carousel-indicator span {  display: inline-block;  width: .06rem;  height: .06rem;  margin-left: .08rem;  border-radius: 50%;  background-color: rgba(255, 255, 255, 0.5);}.b-carousel-indicator .cur {  background-color: #fff;}",
        props: {
            list: {
                type: Array,
                value: [],
                onChange: function () {
                    this.render();
                }
            },
            autoSlide: {
                type: Boolean,
                value: true
            },
            continuousScroll: {
                type: Boolean,
                value: false
            },
            hasIndicator: {
                type: Boolean,
                value: false
            },
            hasTitleBg: {
                type: Boolean,
                value: false
            }
        },
        _distance: 50,
        preprocess: function () {
            var _this = this;

            return $.extend({}, {
                ul: _this.$('.b-carousel-scroller'), // 父dom
                li: _this.$('.b-carousel-scroller').children('li'), // 子dom
                index: 0,
                speed: 4000,
                axisX: true,
                transitionType: 'ease',
                callback: function (i, sum) {
                    _this.$('.b-carousel-indicator').children().eq(i).addClass('cur').siblings().removeClass('cur');
                }
            }, _this.getProp());
        },
        getSlideDistance: function () {
            var _this = this;
            if (_this.reset) {
                _this.opts = _this.preprocess();
            }
            var $li = _this.opts.ul.children();
            _this._slideDistance = _this.opts.axisX ? _this.opts.ul.width() : _this.opts.ul.height();
            // 定位
            _this.cssTransition(_this.opts.ul, 0);
            _this.cssTranslate(_this.opts.ul, -_this._slideDistance * _this._index);
            _this.cssTransition($li, 0);

            var num = _this.opts.continuousScroll ? -1 : 0;
            $li.each(function (i) {
                _this.cssTranslate($(this), _this._slideDistance * (i + num));
            });
        },
        // css过渡
        cssTransition: function (dom, num) {
            var _this = this;
            dom.css({
                '-webkit-transition': 'all ' + num + 's ' + _this.opts.transitionType,
                'transition': 'all ' + num + 's ' + _this.opts.transitionType
            });
        },
        // css位移
        cssTranslate: function (dom, distance) {
            var _this = this;
            var res = _this.opts.axisX ? distance + 'px, 0, 0' : '0, ' + distance + 'px, 0';
            dom.css({
                '-webkit-transform': 'translate3d(' + res + ')',
                'transform': 'translate3d(' + res + ')'
            });
        },
        autoSlides: function () {
            var _this = this;
            if (_this.opts.autoSlide) {
                _this.stopSlide();
                _this.autoSlide = setInterval(function () {
                    _this.slide('next', '.3');
                }, _this.opts.speed);
            }
        },
        stopSlide: function () {
            clearInterval(this.autoSlide);
        },
        slide: function (go, num) {
            var _this = this;
            // 判断方向
            if (typeof go === 'number') {
                _this._index = go;
                // 加载当前屏、前一屏、后一屏
            }
            else if (go === 'next') {
                _this._index++;
            }
            else if (go === 'prev') {
                _this._index--;
            }

            // 是否需要连续滚动
            if (_this.opts.continuousScroll) {
                if (_this._index >= _this._liLength) {
                    _this.scroll(num);
                    _this._index = 0;
                    setTimeout(function () {
                        _this.scroll(0);
                        return;
                    }, 300);
                }
                else if (_this._index < 0) {
                    _this.scroll(num);
                    _this._index = _this._liLength - 1;
                    setTimeout(function () {
                        _this.scroll(0);
                        return;
                    }, 300);
                }
                else {
                    _this.scroll(num);
                }
            }
            else {
                if (_this._index >= _this._liLength) {
                    _this._index = 0;
                }
                else if (_this._index < 0) {
                    _this._index = _this._liLength - 1;
                }
                _this.scroll(num);
            }

            // 若 go 参数为空，则不回调
            if (arguments[0] !== '') {
                _this.opts.callback(_this._index, _this._liLength);
            }
        },
        // 轮播
        scroll: function (num) {
            var _this = this;
            _this.cssTransition(_this.opts.ul, num);
            _this.cssTranslate(_this.opts.ul, -_this._index * _this._slideDistance);
        },
        // touches
        touches: function (e) {
            var _this = this;
            if (_this.support.touch && !e.touches) {
                e.touches = e.originalEvent.touches;
            }
        },
        // touchstart
        touchstart: function (e) {
            var _this = this;
            _this.isScrolling = undefined;
            _this._moveDistance = 0;
            // 按下时的坐标
            _this._startX = _this.support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
            _this._startY = _this.support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
        },
        // touchmove
        touchmove: function (e) {
            var _this = this;
            // 若自动切换，move时需要清除 autoSlide自动轮播 方法
            if (_this.opts.autoSlide) {
                _this.stopSlide();
            }
            // 触摸时的坐标
            _this._curX = _this.support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
            _this._curY = _this.support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
            // 触摸时的距离
            _this._moveX = _this._curX - _this._startX;
            _this._moveY = _this._curY - _this._startY;
            // 优化触摸禁止事件
            if (typeof _this.isScrolling === 'undefined') {
                if (_this.opts.axisX) {
                    _this.isScrolling = !!(Math.abs(_this._moveX) >= Math.abs(_this._moveY));
                }
                else {
                    _this.isScrolling = !!(Math.abs(_this._moveY) >= Math.abs(_this._moveX));
                }
            }
            // 距离
            if (_this.isScrolling) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                else {
                    e.returnValue = false;
                }
                // 触摸时同步滚动
                _this.cssTransition(_this.opts.ul, 0);
                _this._moveDistance = _this.opts.axisX ? _this._moveX : _this._moveY;
            }

            if (!_this.opts.continuousScroll) {
                // 若为第一屏且往下滚动则不让滚动；或若为最后一屏往上滚动则不让滚动
                if (_this._index === 0 && _this._moveDistance > 0 || (_this._index + 1) >= _this._liLength && _this._moveDistance < 0) {
                    _this._moveDistance = 0;
                }
            }
            // 触摸时同步滚动
            _this.cssTranslate(_this.opts.ul, -(_this._slideDistance * _this._index - _this._moveDistance));
        },
        // touchend
        touchend: function () {
            var _this = this;
            if (_this.opts.autoSlide) {
                _this.autoSlides();
            }
            // 距离小
            if (Math.abs(_this._moveDistance) <= _this._distance) {
                _this.slide('', '.3');
                // 距离大
            }
            else {
                // 手指触摸上一屏滚动
                if (_this._moveDistance > _this._distance) {
                    _this.slide('prev', '.3');
                    // 手指触摸下一屏滚动
                }
                else if (Math.abs(_this._moveDistance) > _this._distance) {
                    _this.slide('next', '.3');
                }
            }
            _this._moveDistance = 0;
        },
        init: function () {
            var _this = this;
            var $el = this.$('.b-carousel-wrapper');
            // 检测
            var support = {
                // 触摸
                touch: (window.Modernizr && Modernizr.touch === true) || (function () {
                    return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
                })()
            };

            _this.$el = $el;
            _this.support = support;

            _this.opts = _this.preprocess();
            _this._index = _this.opts.index;
            _this._liLength = _this.opts.li.length; // 轮播数量
            _this.isScrolling;

            // 处理 “点点”
            if (_this.opts.hasIndicator) {
                _this.$el.find('.b-carousel-indicator').children().first().addClass('cur');
            }

            // 当轮播小于等于1，跳出
            if (_this._liLength <= 1) {
                return false;
            }

            // 当轮播数量大于6时，不现实标题，否则标题会和 indicator 重合
            if (_this._liLength > 6) {
                _this.opts.li.find('.b-carousel-title').hide();
            }

            // 连续滚动，复制dom
            if (_this.opts.continuousScroll) {
                _this.opts.ul.prepend(_this.opts.li.last().clone()).append(_this.opts.li.first().clone());
            }


            // 计算轮播宽度
            _this.getSlideDistance();

            // 自动轮播
            _this.autoSlides();

            _this.bindEvents();

            $('img').imageDelayload();
        },
        bindEvents: function () {
            var _this = this;
            // 绑定触摸
            _this.$el.on('touchstart', function (e) {
                _this.touches(e);
                _this.touchstart(e);
            });
            _this.$el.on('touchmove', function (e) {
                _this.touches(e);
                _this.touchmove(e);
            });
            _this.$el.on('touchend', function () {
                _this.touchend();
            });
            _this.opts.ul.on('webkitTransitionEnd MSTransitionEnd transitionend', function () {
                _this.autoSlides();
            });
            // 横竖屏、窗口调整
            $(window).on('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
                clearTimeout(_this.timer);
                _this.timer = setTimeout(function () {
                    _this.reset = true;
                    _this.getSlideDistance();
                }, 150);
            });
        }
    });

    return BCarousel;
});
