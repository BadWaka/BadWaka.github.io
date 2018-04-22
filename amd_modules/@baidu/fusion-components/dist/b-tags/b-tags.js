/**
 * @file Tags组件 - 交互动效
 * @author xielingjuan(xielingjuan@baidu.com)
 * @module BTags
 */

define(function (require) {
    
    var register = require('../deps/fusion.best');
    var IScroll = require('../deps/iscroll');
    var detect = require('../deps/detect');

    /*
     * @class
     * @alias module: BTags
     */
    var BTags = register('b-tags', {
        css: "b-tags {  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.b-tags-nav {  position: relative;  min-width: 100%;  height: 30px;  padding: 0 0.17rem;  font-size: 14px;  white-space: nowrap;  display: -webkit-box;  -webkit-box-orient: horizontal;  -webkit-box-direction: normal;  -webkit-box-pack: justify;  -webkit-box-align: stretch;  -webkit-box-lines: single;  display: -webkit-flex;  -webkit-flex-direction: row;  -webkit-justify-content: space-between;  -webkit-align-items: stretch;  -webkit-align-content: flex-start;  -webkit-flex-wrap: nowrap;}.b-tags-nav-view .b-tags-nav {  display: block;}.b-tags-nav-view {  position: relative;  height: 30px;  overflow: hidden;}.b-tags-nav-li {  display: block;  -webkit-box-flex: 1;  -webkit-flex: 1 1 auto;  width: 16.66666667%;  border: 1px solid #d9d9d9;  list-style: none;  text-decoration: none;  height: 30px;  line-height: 29px;  color: #333;  text-align: center;  text-overflow: ellipsis;  white-space: nowrap;  overflow: hidden;  margin-right: 8px;  border-radius: 3px;}.b-tags-nav-li-last {  margin-right: 0;}.b-tags-nav-view .b-tags-nav-li {  display: inline-block;  width: auto;  padding: 0 12px;  margin-right: 8px;}.b-tags-nav .b-tags-btn-selected {  color: #333;  border: 1px solid #333;}.b-tags-nav-toggle {  position: absolute;  top: 0;  right: 0;  z-index: 9;  display: block;  text-align: center;  width: 80px;  height: 30px;  background: -webkit-gradient(linear, left center, right center, from(rgba(255, 255, 255, 0)), color-stop(0.55, #fff), to(#fff));  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0), #fff 55%, #fff);}.b-tags-nav-view .b-tags-nav-toggle::before {  display: inline-block;  position: absolute;  top: 12px;  right: 22px;  content: \"\";  width: 0;  height: 0;  border-top: 5px solid #999;  border-left: 5px solid transparent;  border-right: 5px solid transparent;}.b-tags-nav-layer {  position: absolute;  top: 0;  z-index: 8;  width: 100%;  background-color: #fff;  max-height: 320px;  overflow-y: auto;  overflow-x: hidden;}.b-tags-nav-layer p {  color: #999;}.b-tags-nav-layer .b-tags-nav-toggle {  position: absolute;  right: -6px;  top: 0;  padding-right: 16px;  color: #666;}.b-tags-nav-layer .b-tags-btn {  height: 30px;  line-height: 29px;  text-align: center;}.b-tags-nav-layer .b-tags-btn span {  display: inline-block;  width: 100%;  border: 1px solid #d9d9d9;  color: #333;  height: 30px;  border-radius: 3px;}.b-tags-nav-layer .b-tags-btn-selected span {  color: #333;  border: 1px solid #333;}.b-tags-shadow {  right: 40px;  position: absolute;  top: 0;  width: 10px;  height: 30px;  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0), #ffffff);  background: linear-gradient(to right, rgba(255, 255, 255, 0), #ffffff);}.b-tags-nav-mask {  position: absolute;  z-index: 7;  top: 0;  left: 0;  background: rgba(0, 0, 0, 0.4);  height: 1024px;  width: 100%;}",
        tpl: "<div class=\"b-tags\">\n    <div class=\"c-row-tile\">\n        <% if: ${list.length} > 4 %>\n        <div class=\"b-tags-nav-view\">\n        <% /if %>\n            <ul class=\"b-tags-nav\">\n            <% for: ${list} as ${l}, ${key} %><li class=\"b-tags-nav-li ${logClass} b-tags-btn<% if: ${key} === ${current} %> b-tags-btn-selected<% /if %><% if: ${list.length} < 5 && ${key} + 1 == ${list.length}%> b-tags-nav-li-last<%/if%>\" style=\"line-height: ${lineHeight}px;\" data-tid=\"${key}\">${l}</li><% /for %>\n            </ul>\n        <% if: ${list.length} > 4 %>\n            <div class=\"b-tags-nav-toggle ${logClass}\"></div>\n        </div>\n        <% /if %>\n    </div>\n</div>",
        /**
         * 
         * @param {Object} props BTags预设属性
         * @param {Array}  props.list tags的内容列表
         * @param {Number}  props.current 当前选中的tags序号
         * @param {String}  props.toggleLable 菜单的文案
         * @param {String} props.logClass 日志class
         */
        props: {
            list: {
                type: Array,
                value: [],
                onChange: function () {
                    this.render();
                    this.refresh();
                }
            },
            current: {
                type: Number,
                value: 0
            },
            toggleLabel: {
                type: String,
                value: ''
            },
            logClass: {
                type: String,
                value: 'WA_LOG_BTN'
            },
            lineHeight: {
                type: Number,
                value: ((detect.os.n === 'ios') ? 29 : 30)
            }
        },
        /**
         * 初始化
         * 绑定tags点击事件
         */
        init: function () {
            var _this = this;
            $(this.element).on('click', '.b-tags-btn', function () {
                var $this = $(this);
                var index = $this.data('tid');
                _this._select(index);
                _this.trigger('change', {current: index});
            });
            var list = this.getProp('list');
            if (list.length > 4) {
                this._setScroll();
                this._setToggleMore();
            }
        },
        /**
         * @type {Number}
         * 0: 隐藏
         * 1: 展开
         */
        _toggleState: 0,
        /**
         * @private
         * 渲染弹出菜单dom
         * 绑定展开收起菜单事件
         * 绑定点击遮罩事件
         */
        _setToggleMore: function () {
            var _this = this;
            var list = this.getProp('list');
            var current = this.getProp('current');
            var text = this.getProp('toggleLabel');
            var logClass = this.getProp('logClass');
            var lines = Math.ceil(list.length / 3);
            var htmlStr = '<div class="b-tags-nav-layer" style="display: none;">';
            htmlStr += '<div class="c-row c-gap-top-small">';
            htmlStr += '<div class="c-span8">';
            htmlStr += '<p>' + text + '</p>';
            htmlStr += '</div>';
            htmlStr += '<div class="c-span4">';
            htmlStr += '<div class="b-tags-nav-toggle ' + logClass + '" style="position: relative; padding-right: 0; right: 0; top: 0; width: 100%; height: 22px;">';
            htmlStr += '<div style="position: absolute; right: 5px; top: 8px; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent;border-bottom: 5px solid #999;"></div>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            for (var i = 0; i < lines; i++) {
                htmlStr += '<div class="c-row c-gap-bottom-large c-gap-top-large">';
                for (var j = 0; j < 3; j++) {
                    var index = 3 * i + j;
                    htmlStr += '<div class="c-span4';
                    if (list[index] != undefined) {
                        htmlStr += ' b-tags-btn ' + logClass;
                        if (index === current) {
                            htmlStr += ' b-tags-btn-selected';
                        }
                        htmlStr += '" style="line-height: ' + this.getProp('lineHeight') + 'px;"';
                        htmlStr += ' data-tid="' + index;
                    }
                    htmlStr += '">';
                    if (list[index] != undefined) {
                        htmlStr += '<span>' + list[index] +'</span>';
                    }
                    htmlStr += '</div>';
                }
                htmlStr += '</div>';
            }
            htmlStr += '</div>';
            htmlStr += '<div class="b-tags-nav-mask" style="display: none;">';
            this.$('.c-row-tile').append(htmlStr);
            /**
             * @event
             * 点击展开收起菜单时触发
             */
            $(this.element).on('click', '.b-tags-nav-toggle', function () {
                if (_this._toggleState) {
                    _this.hideToggle();
                }
                else {
                    _this._showToggle();
                }
            });
            /**
             * @event
             * 点击遮罩时触发
             */
            $(this.element).on('click', '.b-tags-nav-mask', function (e) {
                e.preventDefault();
                _this.hideToggle();
            });
        },
        /**
         * @private
         * 展开菜单
         */
        _showToggle: function () {
            var $layer = this.$('.b-tags-nav-layer');
            var $toggle = this.$('.b-tags-nav-view .b-tags-nav-toggle');
            var $mask = this.$('.b-tags-nav-mask');
            $layer.show();
            $mask.show();
            $toggle.hide();
            // 这里尝试过用阻止事件冒泡的方法。不可行。只有在弹窗内容少于一屏的时候才有效。而业务逻辑无法保证弹窗内容少于一屏且不需要滚动。
            $('body').css('position', 'fixed').css('width', '100%');
            this._toggleState = 1;
        },
        /**
         * @private
         * 隐藏菜单
         */
        hideToggle: function () {
            var $layer = this.$('.b-tags-nav-layer');
            var $toggle = this.$('.b-tags-nav-view .b-tags-nav-toggle');
            var $mask = this.$('.b-tags-nav-mask');
            $layer.hide();
            $mask.hide();
            $toggle.show();
            this._toggleState = 0;
            $('body').css('position', '');
        },
        /**
         * @private
         * 展开菜单
         */
        _select: function (index) {
            this.$('.b-tags-btn').removeClass('b-tags-btn-selected');
            this.$('.b-tags-btn[data-tid="' + index + '"]').addClass('b-tags-btn-selected');
            var btn = this.$('.b-tags-nav-li').get(index);
            this._scrollToElement(btn);
            this.hideToggle();
        },
         /**
         * @type {Number}
         */
        _scrollSize: -40,
        /**
         * @private
         * tags滑动到特定位置
         */
        _scrollToElement: function (dom) {
            this.scroll && this.scroll.scrollToElement(dom, 500, this._scrollSize, 0, '', {autoScroll: true});
        },
        /**
         * @private
         * tags滑动
         */
        _setScroll: function () {
            this._getScrollWidth();
            var viewDom = this.$('.b-tags-nav-view').get(0);
            this.scroll = new IScroll(viewDom, {
                disableMouse: true,
                disablePointer: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: true,
                scrollbars: false
            });
            var current = this.getProp('current');
            var list = this.getProp('list');
            if (current > 0 && current < list.length) {
                var $btn = this.$('.b-tags-nav-li').eq(current);
                if ($btn.length) {
                    this._scrollToElement($btn.get(0));
                }
            }
        },
        /**
         * @private
         * 设置tags横滑的总宽度
         */
        _getScrollWidth: function () {
            var $wrapper = this.$('.b-tags-nav');
            var pdl = parseInt($wrapper.css('padding-left') || 16);
            var pdr = parseInt($wrapper.css('padding-right') || 16);
            var wid = pdl;

            $wrapper.find('.b-tags-nav-li').each(function (i, e) {
                var mgr = parseInt($(e).css('margin-right') || 10);
                wid += $(e).width() + mgr;
            });
            wid += this.$('.b-tags-nav-toggle').width();
            $wrapper.width(wid);
        },
        /**
         * @public
         * 重置tags总宽度
         * 重置scroll
         */
        refresh: function () {
            this._getScrollWidth();
            this.scroll && this.scroll.refresh && this.scroll.refresh();
        }
    });
});