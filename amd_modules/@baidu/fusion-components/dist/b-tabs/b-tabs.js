/**
 * Tab组件 - 交互动效
 *
 * @param  {Function} register 注册组件函数
 * @param  {Function} Tabs     Tabs类
 *
 * @return {Function}    BTabs类
 */

define(function (require) {
    
    var register = require('../deps/fusion.best');
    var Naboo = require('../deps/naboo');
    var Spark = require('../deps/spark');

    /**
     * 横向移动缩放动画
     *
     * @param  {Function} next     下一步指令
     * @param  {Object}   dom      要进行动画的dom节点
     * @param  {Number}   duration 动画时长，单位ms
     * @param  {String}   ease     缓动函数
     * @param  {Number}   dest     终点位置
     */
    Naboo.register('transform', function (next, dom, duration, ease, dest, width) {
        var originWidth = dom.offsetWidth;  // dom原始宽度
        var multiple = width / originWidth; // dom宽度放大倍数
        var transform = 'translateX(' + dest + 'px) scaleX(' + multiple + ')';
        var property = {
            'transform': transform,
            '-webkit-transform': transform,
            'transform-origin': 'left top',
            '-webkit-transform-origin': 'left top'
        };
        Spark.css3(dom, property, duration, ease, 0, function () {
            next();
        });
    });

    function getClosestChild($root, selector) {
        while ($root.children().length > 0 && $root.children(selector).length < 1) {
            $root = $root.children();
        }

        return $root.children(selector);
    }

    var fn = function() {};

    var _init = function(opt) {
        var _this = this,
        $panel = $(_this.panel);

        this.toggle = getClosestChild($panel, '.' + _this.toggleClass);//.find('.' + _this.toggleClass);       // 更多切换按钮
        this.view = getClosestChild($panel, '.' + _this.viewClass);//.find('.' + _this.viewClass);           // nav可视区dom
        this.wrapper = getClosestChild($panel, '.' + _this.navWrapperClass);//.find('.' + _this.navWrapperClass);  // nav实际区域dom
        this.navs = getClosestChild(this.wrapper, '.' + _this.navClass);//.find('.' + _this.navClass);      // nav项
        this.conts = getClosestChild($panel, '.' + _this.contClass);//.find('.' + _this.contClass);          // tabs内容
        
        this.sum = this.navs.length;
        this.tabScroll = undefined;

        _setEvents.call(this);
        this.allowScroll && this.view.length && _setScroll.call(this);
        this.toggleMore && this.allowScroll && this.view.length && _setToggerMore.call(this);
    },
    _setScroll = function() {
        var _this = this;
        getNavsWidth();
        
        // 调用iscroll组件实现横滑功能
        require(['../deps/iscroll'], function (IScroll){
            _this.tabScroll = new IScroll(_this.view[0], {
                disableMouse: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: true,
                scrollbars: false
            });

            // 前置检测选中的tab是否在可视区
            if (_this.current > 0 && _this.current < _this.sum) {
                var currentTab = Math.min(_this.current + 1, _this.sum - 1);
                var $nav = _this.navs.eq(currentTab);
                if ($nav.length && ($nav.position().left + $nav.width()) > _this.view.width()) {
                    _this.tabScroll.scrollToElement(_this.navs[_this.current], 500, _this.scrollSize, 0, '', {autoScroll: true});
                }
            }

            // 若tab横滑回调方法存在,执行回调
            if (typeof _this.onTabScrollEnd === 'function') {
                _this.tabScroll.on('scrollEnd', function () {
                    if (this.customFlag && this.customFlag.autoScroll) {
                        // 若为自动触发滑动，不执行回调
                        return;
                    };
                    _this.onTabScrollEnd.call(_this, this);
                });
            }

            // 监听唯一答案展开事件，解决无法获取隐藏元素尺寸问题
            $('body').one('onlyshowMore.b_tabs', function () {
                _this.timer = setTimeout(function() {
                    getNavsWidth();
                    _this.tabScroll.refresh();
                }, 0);
            });
        });

        function getNavsWidth() {
            // c-tabs-nav节点的左右padding
            var $wrapper = _this.wrapper;
            var pdl = parseInt($wrapper.css('padding-left') || 16);
            var pdr = parseInt($wrapper.css('padding-right') || 16);
            // 计算navs总宽度
            _this.navsWidth = pdl + pdr;
            _this.navs.each(function(i, v) {
                _this.navsWidth += $(v).width();
            });
            // 设置tabs实际区域宽度
            _this.wrapper.width(_this.navsWidth + _this.toggle.width());
        }
    },
    _setToggerMore = function() {
        var _this = this;
        var $navLayer = $('<div class="c-tabs-nav-layer"><p>' + _this.toggleLabel + '</p></div>');
        var $navLayerUl = $('<ul class="c-tabs-nav-layer-ul"></ul>');
        
        _this.toggleState = 0;   // 展开状态 0-收起,1-展开
        
        // 事件代理
        $navLayerUl.on('click', '.'+_this.navClass, function(){
            var $dom_this = $(this);
            //$(this).addClass(_this.currentClass);
            _this.navs.eq($dom_this.attr('data-tid')).trigger('click');
            toggleUp();
        });

        _this.toggle.on('click', function() {
            if (_this.toggleState == 0) {
                // 点击时为收起
                toggleDown();
            } else {
                // 点击时为展开
                toggleUp();
            };
        });

        // 收起
        function toggleUp() {
            $navLayerUl.empty();
            $navLayer.hide();
            _this.toggle.css({
                '-webkit-transform': 'scaleY(1)',
                'transform': 'scaleY(1)'
            });
            _this.toggleState = 0;
        }

        // 展开
        function toggleDown() {
            $navLayerUl.html(_this.navs.clone());
            $navLayer.append($navLayerUl);
            _this.view.after($navLayer.show());
            _this.toggle.css({
                '-webkit-transform': 'scaleY(-1)',
                'transform': 'scaleY(-1)'
            });
            _this.toggleState = 1;
        }

    },
    _insertTransLine = function () {
        if (this.transLine) {
            return;
        }
        var $currentNavLi = this.wrapper.find('.' + this.currentClass);

        /**
         * 模板在实际使用过程中可能没有菜单li节点
         */
        if ($currentNavLi.length < 1) {
            return;
        }

        /**
         * 华为荣耀手百无法直接获取css('border-bottom')，必须分别获取分解后的width, style, color，WTF!!!
         */
        var borderWid = $currentNavLi.css('border-bottom-width');
        var borderStyle = $currentNavLi.css('border-bottom-style');
        var borderColor = $currentNavLi.css('border-bottom-color');
        var border = [borderWid, borderStyle, borderColor].join(' ');

        var left = $currentNavLi.position().left;
        this.transLine = $('<div></div>').css({
            'display': 'none',
            'position': 'absolute',
            'left': 0,
            'bottom': 0,
            'width': $currentNavLi.width(),
            'height': 0,
            'border-bottom': border,
            'transform': 'translateX(' + left + 'px)',
            '-webkit-transform': 'translateX(' + left + 'px)'
        }).appendTo(this.wrapper);
    },
    _setEvents = function() {
        var _this = this;

        $.each(_this.navs, function(i, v){
            var $v = $(v);
            if($v.hasClass(_this.currentClass)){
                _this.current = i;          // 获取当前nav序号
                _insertTransLine.call(_this);   // 插入用于切换动效的线条
            }

            $v.addClass(_this.logClass);
            $v.attr('data-tid', i);

            $v.on('click', function(){
                var tid = parseInt($(this).attr('data-tid'));
                if(tid === _this.current){
                    return;
                }

                _this.last = _this.current;
                _this.current = tid;
                _this.hideTab(_this.last);
                _this.showTab(_this.current);

                if(_this.onResetChange == fn){
                    _this.hideContent(_this.last);
                    _this.showContent(_this.current);

                    /* 添加异步处理事件，返回点击tab序号及内容框 */
                    _this.onChange.call(_this, _this.current, _this.conts[_this.current]);
                }else{
                    _this.onResetChange.call(_this, _this.current);
                }

                // 滑动对象存在,执行滑动并传递autoScroll标记用于scrollEnd事件判断
                if (_this.tabScroll) {
                    _this.tabScroll.scrollToElement($v[0], 500, _this.scrollSize, 0, '', {autoScroll: true});
                };
            });
        });

        // 第一次加载
        $.each(_this.conts, function(i, v){
            if(i == _this.current){
                _this.showTab(i, true);
                _this.showContent(i);
                _insertTransLine.call(_this);   // 插入用于切换动效的线条
            }else{
                _this.hideTab(i);
                _this.hideContent(i);
            }
        });
    };

    var Tabs = function(panel, options) {
        options = options || {};
        this.panel = panel;
        this.current = options.current || 0;      // 当前选中的tab
        this.currentClass = options.currentClass || 'c-tabs-nav-selected';
        this.navWrapperClass = options.navWrapperClass || 'c-tabs-nav';
        this.navClass = options.navClass || 'c-tabs-nav-li';
        this.contClass = options.contClass || 'c-tabs-content';
        this.viewClass = options.viewClass || 'c-tabs-nav-view';
        this.toggleClass = options.toggleClass || 'c-tabs-nav-toggle';
        this.allowScroll = options.allowScroll || false;    // 是否允许滚动
        this.toggleMore = options.toggleMore || false;      // 是否允许切换显示更多
        this.toggleLabel = options.toggleLabel || '请选择'; // 切换label
        this.logClass = options.logClass || 'WA_LOG_TAB';   // 统计class
        this.scrollSize = options.scrollSize || '-40';        // tabs滚动的size
        this.transLine = null;

        this.navs = [];
        this.seps = [];
        this.conts = [];
        this.sum = 0;       // tab个数
        this.last = null;   // 上次tab切换序号

        // 函数
        this.onChange = options.onChange || fn;
        this.onResetChange = options.onResetChange || fn;
        this.onTabScrollEnd = options.onTabScrollEnd;

        // init
        panel && _init.call(this, options);
    };

    $.extend(Tabs.prototype, {
        showContent : function(i){
            var cont=this.conts[i];
            if(cont){
                $(this.conts[i]).show();
            }
        },
        hideContent : function(i){
            var cont=this.conts[i];
            if(cont){
                $(cont).hide();
            }
        },
        showTab : function(i, first){
            var _this = this,
                navs = _this.navs,
                seps = _this.seps;

            var duration;
            var dom;

            first = (first || false);

            var $nav = $(navs[i]);
            if (!first) {
                $nav.css('border-bottom', 'none');
            }
            $nav.addClass(_this.currentClass);
            if (!first) {
                duration = 100 + Math.abs(_this.current - _this.last) * 50;
                dom = _this.transLine.get(0);
                _this.transLine.show();
                Naboo.transform(dom, duration, 'ease-in-out', $nav.position().left, $nav.width()).start(function () {
                    $nav.css('border-bottom', '');
                    _this.transLine.hide();
                });
            }
        },
        hideTab : function(i){
            var _this = this,
                navs = _this.navs,
                seps = _this.seps;

            $(navs[i]).removeClass(_this.currentClass);
        },
        dispose: function () {
            this.timer && clearTimeout(this.timer);
            $('body').off('onlyshowMore.b_tabs');
            Spark.dispose();
        }
    });

    // 注册b-tabs标签，返回BTabs类
    var BTabs = register('b-tabs', {
        css: 'b-tabs {display:block;}',
        props: {
            allowScroll: {
                type: Boolean,
                value: false
            },
            toggleMore: {
                type: Boolean,
                value: false
            },
            toggleLabel: {
                type: String,
                value: '请选择'
            },
            current: {
                type: Number,
                value: 0
            },
            scrollSize: {
                type: Number,
                value: -40
            }
        },
        holdChild: true,
        init: function () {
            var props = this.getProp();
            var _this = this;
            this.tab = new Tabs($(this.element).children('.c-tabs'), {
                allowScroll: props.allowScroll,
                toggleMore: props.toggleMore,
                toggleLabel: props.toggleLabel,
                current: props.current,
                scrollSize: props.scrollSize,
                onChange: function (id, cnt) {
                    _this.trigger('change', {
                        current: id,
                        cnt: cnt
                    }, false);
                },
                onResetChange: function (id) {
                    this.hideContent(this.last);
                    this.showContent(this.current);
                    _this.trigger('resetChange', {
                        current: id
                    }, false);
                    this.onChange(this.current, this.conts[this.current]);
                },
                onTabScrollEnd: function (scroll) {
                    _this.trigger('tabScrollEnd', scroll, false);
                }
            });
        },
        detached: function () {
            this.tab.dispose();
        }
    });

    return BTabs;
});
