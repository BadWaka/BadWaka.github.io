/**
 * @file Navs组件
 * @author xielingjuan(xielingjuan@baidu.com)
 * @module BNavs
 */

define(function (require) {
    
    var register = require('../deps/fusion.best');
    var IScroll = require('../deps/iscroll');

    /*
     * @class
     * @alias module: BNavs
     */
    var bNavs = register('b-navs', {
        /**
         * 
         * @param {Object} props BNavs预设属性
         * @param {Array}  props.allowScroll 是否允许滑动
         * @param {Number}  props.toggleLabel 弹窗的文案
         * @param {String}  props.logClass 点击日志的class
         */
        props: {
            allowScroll: {
                type: Boolean,
                value: false
            },
            toggleLabel: {
                type: String,
                value: '请选择分类'
            },
            logClass: {
                type: String,
                value: 'WA_LOG_BTN'
            }
        },
        // 保留<c-navs>下的子节点
        holdChild: true,
        // list用来存放弹窗的内容
        _list: [],
        /**
         * 初始化
         * 绑定navs点击事件
         */
        init: function () {
            var _this = this;
            _this._setAttr();

            $(this.element).on('click', '.c-navs-bar-li', function () {
                var $this = $(this);
                var index = $this.data('tid');
                var text = $this.text();
                _this._select(index);
                _this.trigger('change', {current: index, text: text});
            });

            _this.hideToggle();

            var allowScroll = this.getProp('allowScroll');
            if (allowScroll) {
                this._setList();
                this._setScroll();
                this._setToggleMore();
            }
        },
        /**
         * 设置每个nav的日志类、tid属性
         */
        _setAttr: function() {
            var log = this.getProp('logClass');
            this.$('.c-navs-bar-li').each(function(index,e) {
                $(e).addClass(log);
                $(e).attr('data-tid',index);
            });
        },
        /**
         * 获取滑动弹窗的内容放到list中
         * @return {list} [返回的内容数组]
         */
        _setList: function() {
            var _this = this;
            _this._list = [];
            this.$('.c-navs-bar-view .c-navs-bar-li').each(function(index,e) {
                 _this._list.push($(e).text());
            });
        },

        /**
         * @type {Number}
         * 0: 隐藏
         * 1: 展开
         */
        _toggleState: 0,
        /**
         * @private
         * 展开菜单
         */
        _showToggle: function () {
            var $layer = this.$('.c-navs-bar-layer');
            var $toggle = this.$('.c-navs-bar-view .c-navs-bar-toggle');
            var $mask = this.$('.c-navs-bar-mask');
            $layer.show();
            $mask.show();
            $toggle.hide();
            // 如果禁止滚动的话，当弹窗内容超过评估高度的时候，弹窗超过的部分就无法滑动了显示出来。
            //$('.body').css('position', 'fixed').css('width', '100%');
            this._toggleState = 1;
        },
        /**
         * @private
         * 隐藏菜单
         */
        hideToggle: function () {
            var $layer = this.$('.c-navs-bar-layer');
            var $toggle = this.$('.c-navs-bar-view .c-navs-bar-toggle');
            var $mask = this.$('.c-navs-bar-mask');
            $layer.hide();
            $mask.hide();
            $toggle.show();
            this._toggleState = 0;
        },
        /**
         * @private
         * 渲染弹出菜单dom
         * 绑定展开收起菜单事件
         * 绑定点击遮罩事件
         */
        _setToggleMore: function () {
            var _this = this;
            var list = _this._list;
            var current = this.$('.c-navs-bar-selected').index();
            var text = this.getProp('toggleLabel');
            var logClass = this.getProp('logClass');
            var lines = Math.ceil(list.length / 3);
            var htmlStr = '<div class="c-navs-bar-layer" style="display: none;">';
            htmlStr += '<p>' + text + '</p>';
            htmlStr += '<div class="c-navs-bar-toggle ' + logClass + '"><i></i></div>';
            for (var i = 0; i < lines; i++) {
                htmlStr += '<div class="c-row">';
                for (var j = 0; j < 3; j++) {
                    var index = 3 * i + j;
                    htmlStr += '<div class="c-span4';
                    if (list[index] != undefined) {
                        htmlStr += ' c-navs-bar-li ' + logClass;
                        if (index === current) {
                            htmlStr += ' c-navs-bar-selected';
                        }
                        htmlStr += '" data-tid="' + index;
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
            htmlStr += '<div class="c-navs-bar-mask" style="display: none;">';
            this.$('.c-row-tile').append(htmlStr);
            /**
             * @event
             * 点击展开收起菜单时触发
             */
            $(this.element).on('click', '.c-navs-bar-toggle', function () {
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
            $(this.element).on('click', '.c-navs-bar-mask', function (e) {
                e.preventDefault();
                _this.hideToggle();
            });
        },
        /**
         * @private
         * 展开菜单
         */
        _select: function (index) {
            this.$('.c-navs-bar-li').removeClass('c-navs-bar-selected');
            this.$('.c-navs-bar-li[data-tid="'+ index +'"]').addClass('c-navs-bar-selected');
            var btn = this.$('.c-navs-bar-li').get(index);
            this._scrollToElement(btn);
            this.hideToggle();
        },
        /**
         * @private
         * tabs滑动
         */
        _setScroll: function () {
            this._getScrollWidth();
            var viewDom = this.$('.c-navs-bar-view').get(0);
            this.scroll = new IScroll(viewDom, {
                disableMouse: true,
                disablePointer: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: true,
                scrollbars: false
            });
            var current = this.$('.c-navs-bar-selected').index();
            var list = this._list;
          
            if (current > 0 && current < list.length) {
                var $btn = this.$('.c-navs-bar-li').eq(current);
                
                if ($btn.length) {
                    this._scrollToElement($btn.get(0));
                }
            }
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
         * 设置tags横滑的总宽度
         */
        _getScrollWidth: function () {
            var $wrapper = this.$('.c-navs-bar');
            var pdl = parseInt($wrapper.css('padding-left') || 16);
            var pdr = parseInt($wrapper.css('padding-right') || 16);
            var wid = pdl;

            $wrapper.find('.c-navs-bar-li').each(function (i, e) {
                wid += $(e).width();
            });
            wid += this.$('.c-navs-bar-toggle').width();
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
