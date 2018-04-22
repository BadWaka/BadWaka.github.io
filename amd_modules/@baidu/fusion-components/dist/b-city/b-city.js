/**
 * @file 城市选择组件
 * @author  zhulei05
 * @date 2016-11-3
 * @date 2017-03-30
 */
/*eslint-disable */
define(function (require) {

    var register = require('../deps/fusion.best');
    var Naboo = require('../deps/naboo');
    var Spark = require('../deps/spark');
    var Cookie = require('../deps/cookie');
    var geoLocation = require('../deps/geolocation');
    var etpl = require('../deps/bdetpl');

    Naboo.register('moveX', function (next, dom, x, duration, ease) {
        var props = {
            'transform': 'translate3d(' + x + ', 0, 0)',
            '-webkit-transform': 'translate3d(' + x + ', 0, 0)'
        };
        Spark.css3(dom, props, duration, ease, 0, function () {
            next();
        });
    });

    /**
     * 点信息对象定义
     *
     * @date  2015-11-03
     *
     * @param {Object} option 配置参数
     * @param {number}   option.x         墨卡托坐标系X
     * @param {number}   option.y         墨卡托坐标系Y
     * @param {number}   option.accuracy  精度
     * @param {number}   option.cityCode  城市代码
     * @param {number}   option.timestamp 时间戳
     * @param {string}   option.name      当前位置名称
     * @param {string}   option.address   当前位置
     * @param {string}   option.addr      当前位置的 city district street信息
     */
    function Position(option) {
        option = option || {};

        this.x = parseFloat(option.x);
        this.y = parseFloat(option.y);
        this.accuracy = parseFloat(option.accuracy);
        this.cityCode = parseInt(option.cityCode, 10);
        this.timestamp = parseInt(option.timestamp, 10) || undefined;
        this.name = option.name || undefined;
        this.address = option.address || undefined;
        this.addr = option.addr || undefined;
    }

    /**
     * 获取cookie使用的字符串
     *
     * @return {string}
     */
    Position.prototype.getCookieString = function () {
        return this.x + '_' + this.y + '_' + this.accuracy + '_' + this.cityCode + '_' + this.timestamp;
    };

    Position.prototype.output = function () {
        return {
            x: this.x,
            y: this.y,
            accuracy: this.accuracy,
            cityCode: this.cityCode,
            timestamp: this.timestamp,
            name: this.name,
            address: this.address,
            addr: this.addr || {}
        };
    };

    Position.readFromCookie = function (cookie) {
        var info = cookie.split('_');
        // x, y, accuracy, cityCode, timestamp, name, address, addr
        return new Position({
            x: info[0],
            y: info[1],
            accuracy: info[2],
            cityCode: info[3],
            timestamp: info[4]
        });
    };

    Position.readFromObject = function (data) {
        return new Position(data);
    };

    /**
     * baiduloc cookie处理对象
     *
     * @type {Object}
     */
    var geoCookie = {
        domain: '.baidu.com',
        path: '/',
        key: 'BAIDULOC',

        /**
         * 过期时间
         * 48h, 2 * 24 * 3600 * 1000
         *
         * @type {number}
         */
        duration: 172800000,

        get: function () {
            if (!navigator.cookieEnabled) {
                return false;
            }

            var match = Cookie.cookie && Cookie.cookie().match(new RegExp(this.key + '=([^;]+);?'));

            if (match) {
                return Position.readFromCookie(match[1]);
            }

            return false;
        },

        set: function (position) {
            if (!navigator.cookieEnabled) {
                return false;
            }

            position = Position.readFromObject(position);
            position.timestamp = parseInt(Date.now(), 10);
            Cookie.cookie && Cookie.cookie(this.key, position.getCookieString(), {
                domain: this.domain,
                path: this.path,
                expires: this.duration
            });

            return true;
        },

        remove: function () {
            if (!navigator.cookieEnabled) {
                return false;
            }

            Cookie.cookie && Cookie.cookie(this.key, null);
        }
    };

    var BCity = register('b-city', {
        tpl: "<div class=\"b-city-wrapper\">\n    <div class=\"b-city-header\" <% if: (!!${headcolor})%>style=\"background-color:${headcolor}\"<% /if %>>\n        <div class=\"b-city-header-normal\">\n            ${title}\n            <i class=\"c-icon b-city-close\">&#xe61a;</i>\n            <div class=\"b-city-header-normal-search\">\n                <i class=\"c-icon c-gap-left-large c-color-gray\">&#xe737;</i>\n                <span>搜城市</span>\n            </div>\n        </div>\n        <div class=\"b-city-header-search\">\n            <input type=\"text\" placeholder=\"搜城市\" />\n            <i class=\"c-icon c-gray c-gap-left-large\">&#xe737;</i>\n            <button class=\"c-color-gray-a\">取消</button>\n        </div>\n    </div>\n    <div class=\"b-city-content\">\n        <div class=\"b-city-part b-city-part-loc\">\n            <div class=\"b-city-part-title\">定位</div>\n            <div class=\"c-row c-gap-top\">\n                <div class=\"c-span4\">\n                    <div class=\"b-city-btn b-city-btn-loc\" data-val=\"${location.code}\">\n                        ${location.name}\n                    </div>\n                </div>\n                <div class=\"c-span8\">\n                    <div class=\"b-city-reloc\">\n                        <i class=\"c-icon\">&#xe61d;</i>\n                        <span>重新定位</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"b-city-part b-city-part-history\">\n            <div class=\"b-city-part-title\">历史</div>\n            <div class=\"c-row c-gap-top\">\n                <div class=\"c-span4\">\n                </div>\n                <div class=\"c-span4\">\n                </div>\n                <div class=\"c-span4\">\n                </div>\n            </div>\n        </div>\n        <div class=\"b-city-part b-city-part-hot\">\n            <div class=\"b-city-part-title\">热门</div>\n        <% for: ${hot} as ${line} %>\n            <div class=\"c-row c-gap-top\">\n            <% for: ${line} as ${city} %>\n                <div class=\"c-span4\">\n                <% if: ${city} %>\n                    <div class=\"b-city-btn\" data-val=\"${city.code}\">${city.name}</div>\n                <% /if %>\n                </div>\n            <% /for %>\n            </div>\n        <% /for %>\n        </div>\n        <% for: ${list} as ${l}, ${key} %>\n        <div class=\"b-city-part b-city-part-letter b-city-part-${key} c-gap-top-large\">\n            <div class=\"b-city-part-title c-gap-bottom-small\">${key}</div>\n            <% for: ${l} as ${city} %>\n            <div class=\"b-city-part-list-item c-line-bottom\" data-val=\"${city.code}\">${city.name}</div>\n            <% /for %>\n        </div>\n        <% /for %>\n    </div>\n    <div class=\"b-city-sidebar\">\n        <div class=\"b-city-link\" data-anchor=\"loc\">定位</div>\n        <div class=\"b-city-link\" data-anchor=\"hot\">热门</div>\n        <% for: ${list} as ${l}, ${key} %>\n        <div class=\"b-city-link\" data-anchor=\"${key}\">${key}</div>\n        <% /for %>\n    </div>\n    <div class=\"b-city-letter-top\"></div>\n    <div class=\"b-city-large-char\">A</div>\n    <div class=\"b-city-sug b-city-mask\">\n    </div>\n</div>\n",
        css: ".b-city-wrapper {  position: fixed;  left: 0;  top: 0;  display: none;  width: 100%;  height: 100%;  z-index: 900;  background: #fff;  text-align: left;  font-size: 14px;}.b-city-header {  position: absolute;  left: 0;  top: 0;  -webkit-box-sizing: border-box;  box-sizing: border-box;  width: 100%;  height: 44px;  background: #0099ff;  padding: 0 16px;  z-index: 100;}.b-city-header-normal {  position: relative;  height: 44px;  line-height: 44px;  color: #fff;  font-size: 20px;  text-align: center;}.b-city-close {  position: absolute;  left: 0;  top: 0;}.b-city-header-normal-search {  position: absolute;  top: 10px;  right: 0;  width: 100px;  height: 25px;  background: #fff;  border-raduis: 13px;  -webkit-border-radius: 13px;  text-align: left;  font-size: 14px;  line-height: 25px;}.b-city-header-normal-search span {  font-size: 13px;  color: #999;}.b-city-header-search {  display: none;  position: relative;  height: 25px;  line-height: 25px;  background: #fff;  border-radius: 13px;  margin-top: 10px;}.b-city-header-search input {  width: 100%;  height: 25px;  padding: 6px 0 6px 29px;  outline: none;  font-size: 13px;}.b-city-header-search i {  position: absolute;  left: 0;  top: 2px;}.b-city-header-search button {  position: absolute;  right: 0;  top: 0;  height: 25px;  padding: 0 14px;  font-size: 13px;  background: none;  border: none;}.b-city-header-search button:before {  content: '';  position: absolute;  left: 0;  top: 6px;  width: 0;  height: 13px;  border-left: 1px solid #ddd;}.b-city-sug {  display: none;  position: absolute;  left: 0;  top: 0;  width: 100%;  height: 100%;  padding: 44px 16px 0 16px;  -webkit-box-sizing: border-box;  box-sizing: border-box;  z-index: 50;  overflow: scroll;  background: #fff;}.b-city-sug.b-city-mask {  background: rgba(0, 0, 0, 0.3);}.b-city-search-item {  height: 42px;  line-height: 42px;}.b-city-content {  padding: 44px 16px 30px 16px;  width: 100%;  height: 100%;  color: #333;  -webkit-box-sizing: border-box;  box-sizing: border-box;  overflow-x: hidden;  overflow-y: scroll;  -webkit-overflow-scrolling: touch;}.b-city-part {  margin-top: 18px;}.b-city-part-loc,.b-city-part-history,.b-city-part-hot {  padding-right: 29px;}.b-city-part-history {  display: none;}.b-city-btn {  height: 38px;  line-height: 38px;  background: #f8f8f8;  text-align: center;}.b-city-reloc {  display: inline-block;  height: 38px;  line-height: 38px;}@-webkit-keyframes b-city-relocing-rotation {  from {    -webkit-transform: rotate(1deg);  }  to {    -webkit-transform: rotate(360deg);  }}.b-city-reloc i {  display: inline-block;}.b-city-relocing i {  -webkit-animation: b-city-relocing-rotation 1s ease 0s infinite normal;}.b-city-part-list-item {  height: 39px;  line-height: 39px;}.b-city-sidebar {  position: absolute;  right: 7px;  top: 46px;  width: 38px;  color: #666;  text-align: center;  z-index: 50;  -webkit-tap-highlight-color: transparent;}.b-city-link {  font-size: 10px;  line-height: 18px;}.b-city-letter-top {  display: none;  position: absolute;  top: 44px;  left: 0;  width: 100%;  height: 50px;  padding-left: 16px;  line-height: 50px;  background: #fff;  z-index: 40;  -webkit-box-sizing: border-box;  box-sizing: border-box;}.b-city-large-char {  display: none;  position: absolute;  left: 50%;  top: 50%;  width: 78px;  height: 78px;  line-height: 78px;  margin-left: -39px;  margin-top: -39px;  border-radius: 3px;  font-size: 36px;  color: #fff;  text-align: center;  background: rgba(51, 51, 51, 0.4);}",
        props: {
            headcolor: {
                type: String,
                value: '',
                onChange: function () {
                    this.render();
                }
            },
            title: {
                type: String,
                value: '选择城市'
            },
            path: {
                type: String,
                value: './cityInfo',
                onChange: function () {
                    this.render();
                }
            },
            location: {
                type: Object,
                value: {},
                onChange: function () {
                    this.render();
                }
            }
        },
        // 包含所有城市信息的一个数组
        all: [],
        // 表示 citylist 模块是否加载过，如果加载过，该值为 path
        loaded: '',
        // 定位功能中显示的城市规则
        locationShowType: 'city',
        // 数据预处理
        preprocess: function (data) {

            var hot = data.hot;
            var lineSize = 3;
            var num = Math.ceil(hot.length / lineSize);
            var arr = Array(lineSize * num - hot.length);
            hot = hot.concat(arr);
            var hotSeperate = [];
            for (var i = 0; i < num; i++) {
                hotSeperate[i] = hot.slice(i * lineSize, (i + 1) * lineSize);
            }

            // 把data.list扁平化，去掉key
            // 每个key对应的数组合并到同一个数组里
            var all = [];

            Object.keys(data.list).forEach(function (e, i) {
                all = all.concat(data.list[e]);
            });
            this.all = all;
            if (data.location && data.location.showType) {
                this.locationShowType = data.location.showType;
            }

            return {
                hot: hotSeperate,
                list: data.list,
                headcolor: data.headcolor || this.getProp('headcolor'),
                location: data.location || this.getProp('location'),
                title: data.title || this.getProp('title')
            };
        },
        // 重写render方法，实现数据渲染前的预处理
        render: function () {
            var me = this;
            if (!me.constructor.styled && me.css) {
                var styleTag = document.createElement('style');
                styleTag.setAttribute('data-for', 'fusion');
                styleTag.innerText = me.css;
                document.querySelector('head').appendChild(styleTag);
                me.constructor.styled = true;
            }

            if (me.holdChild) {
                return;
            }
            // 判断开发者是否传入citylist模块路径,如果木有,则使用默认路径
            var domData = me.getProp();
            var cityInfosModule = domData.path;

            if (cityInfosModule === me.loaded) {
                return;
            }
            require([cityInfosModule], function (getCitysFn) {
                me.loaded = cityInfosModule;

                if (typeof getCitysFn !== 'function') {
                    throw new Error('module citylist export is not a function');
                }

                getCitysFn(function (infos) {
                    // render html
                    var render = etpl.compile(me.tpl);
                    var data = me.preprocess(infos);
                    $(me.element).append(render(data));

                    setTimeout(function () {
                        me.bindEvents();

                        if (me.fusionCityReady) {
                            me.fusionCityReady();
                        }
                    });

                    if (data.location && data.location.name && data.location.code) {
                        return;
                    }

                    var pos = geoCookie.get();

                    // 如果cookie中存在定位信息
                    if (pos) {
                        geoLocation.mercatorToAddress({
                            x: pos.x,
                            y: pos.y,
                            onSuccess: function (data) {
                                if (data && data.addr && data.addr.city && data.addr.city_code) {
                                    var showName = pos.addr.city;
                                    var showKey = showName;
                                    if (me.locationShowType === 'district' && pos.addr.district) {
                                        showName = pos.addr.district;
                                        /* 区县会有重名，如果参数设置只显示区域则增加showKey值为城市+区域组合，区分重名 */
                                        showKey += showName;
                                    }
                                    me._setLocBtn({
                                        name: showName,
                                        code: pos.addr.city_code,
                                        key: showKey
                                    });
                                }
                                else {
                                    me._setLocBtn(me.defaultLoc);
                                }
                            },
                            onFail: function (data) {
                                me._setLocBtn(me.defaultLoc);
                            }
                        });
                    }
                    else {
                        me._setLocBtn(me.defaultLoc);
                    }
                });
            });
        },
        defaultLoc: {
            name: '北京',
            code: 131
        },
        // 设置定位按钮的样式
        _setLocBtn: function (info) {
            var $locBtn = this.$('.b-city-btn-loc');
            $locBtn.text(info.name);
            $locBtn.data('val', info.code);
            if (info.key) {
                $locBtn.data('key', info.key);
            }
            if (info.disable) {
                $locBtn.addClass('c-color-gray');
            }
            else {
                $locBtn.removeClass('c-color-gray');
            }
        },
        init: function () {
        },
        bindEvents: function () {
            var me = this;

            this.$('.b-city-close').on('click', function (e) {
                me.close();
            });

            this.$('.b-city-header-normal-search').on('click', function () {
                me.$('.b-city-header-normal').hide();
                me.$('.b-city-header-search').show();
                me.$('.b-city-sug').show();
                me.$('.b-city-header-search input').focus();
            });

            this.$('.b-city-header-search button, .b-city-mask').on('click', function () {
                me.$('.b-city-header-normal').show();
                me.$('.b-city-header-search').hide();
                me.$('.b-city-sug').hide().addClass('b-city-mask').html('');
                me.$('.b-city-header-search input').val('');
            });

            this.$('.b-city-content').on('scroll', function () {
                var headerHei = me.$('.b-city-header').height();
                var $letterTop = me.$('.b-city-letter-top');
                var last = false;
                var $titles = me.$('.b-city-part-letter .b-city-part-title');
                for (var i = 0, len = $titles.length; i < len; i++) {
                    var $title = $titles.eq(i);
                    var top = $title.position().top;
                    // 字母置顶浮层行高50px，字体大小14px
                    // 所以文字上下还有18px空间
                    if (top <= (headerHei + 18)) {
                        last = $title.text();
                    }
                    else {
                        var letterTopHei = $letterTop.height();
                        if (top < (letterTopHei + headerHei)) {
                            $letterTop.css('top', top - letterTopHei);
                        }
                        else {
                            $letterTop.css('top', headerHei);
                        }
                        break;
                    }
                }
                if (last) {
                    $letterTop.text(last).show();
                }
                else {
                    $letterTop.hide();
                }
            });

            this.$('.b-city-sidebar').on('touchmove', function (e) {
                var y = e.touches[0].clientY;
                y -= parseInt($(this).css('top'));
                var $links = $(this).find('.b-city-link');
                var perHei = $links.eq(0).height();
                var index = Math.floor(y / perHei);
                var anchor = $links.eq(index).data('anchor');
                var char = $links.eq(index).text();
                if (anchor) {
                    var headerHei = me.$('.b-city-header').height();
                    var $wrapper = me.$('.b-city-content');
                    var top = me.$('.b-city-part-' + anchor).position().top;
                    $wrapper.scrollTop($wrapper.scrollTop() + top - headerHei);
                    me._showLargeChar(char);
                }
                return false;
            });

            this.$('.b-city-sidebar').on('click', '.b-city-link', function () {
                var $link = $(this);
                var anchor = $link.data('anchor');
                var char = $link.text();
                if (anchor) {
                    var headerHei = me.$('.b-city-header').height();
                    var $wrapper = me.$('.b-city-content');
                    var top = me.$('.b-city-part-' + anchor).position().top;
                    $wrapper.scrollTop($wrapper.scrollTop() + top - headerHei);
                    me._showLargeChar(char);
                }
                return false;
            });

            this.$('.b-city-header-search input').on('input', function () {
                var $sug = me.$('.b-city-sug');
                var inputELe = this;
                me.timer && clearTimeout(me.timer);
                // 函数节流
                me.timer = setTimeout(function () {
                    var query = $(inputELe).val();
                    if (query == '') {
                        $sug.hasClass('b-city-mask') ? '' : $sug.addClass('b-city-mask');
                        $sug.html('');
                        return;
                    }
                    var list = me.all.filter(function (e, i) {
                        if (e.name.indexOf(query) > -1 || e.pinyin.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                            return true;
                        }
                        return false;
                    });
                    $sug.hasClass('b-city-mask') ? $sug.removeClass('b-city-mask') : '';
                    me.renderSearchList(list, query);
                }, 300);
            });

            this.$('.b-city-wrapper').on('click', '.b-city-btn, .b-city-part-list-item, .b-city-search-item', function () {
                var code = $(this).data('val');
                if (code == '') {
                    return;
                }
                me.close();
                var name = $(this).text();
                var info = {
                    name: name,
                    code: code
                };
                var cityKey = $(this).data('key');
                if (cityKey) {
                    info.key = cityKey;

                }
                // history去重
                var arr = [info];
                me.history.forEach(function (obj, i) {
                    if (obj.code != info.code) {
                        arr.push(obj);
                    }
                });
                me.history = arr;
                me.history.slice(0, 3);
                me.history.forEach(function (obj, i) {
                    obj && me.$('.b-city-part-history .c-span4').eq(i).html('<div class="b-city-btn" data-val="' + obj.code + '"">' + obj.name + '</div>');
                });
                me.$('.b-city-part-history').show();
                var $links = me.$('.b-city-link');
                if ($links.eq(1).data('anchor') != 'history') {
                    $links.eq(0).after('<div class="b-city-link" data-anchor="history">历史</div>');
                }
                me.trigger('selected', info);
            }).on('touchmove', '.b-city-sug', function (e) {
                me.$('.b-city-header-search input').blur();
            });

            this.$('.b-city-reloc').on('click', function () {
                if (geoLocation && geoLocation.getPosition) {
                    $(this).addClass('b-city-relocing');
                    $(this).find('span').text('定位中...');
                    var eleIns = this;
                    geoLocation.getPosition({
                        onSuccess: function (pos) {
                            if (pos.addr && pos.addr.city && pos.addr.city_code) {
                                var showName = pos.addr.city;
                                var showKey = showName;
                                if (me.locationShowType === 'district' && pos.addr.district) {
                                    showName = pos.addr.district;
                                    /*区县会有重名，如果参数设置只显示区域则增加showKey值为城市+区域组合，区分重名*/
                                    showKey += showName;
                                }
                                me._setLocBtn({
                                    name: showName,
                                    code: pos.addr.city_code,
                                    key: showKey
                                });
                            }
                            else {
                                me._setLocBtn({
                                    name: '定位失败',
                                    code: '',
                                    disable: true
                                });
                            }
                            $(eleIns).removeClass('b-city-relocing');
                            $(eleIns).find('span').text('重新定位');
                        },
                        onFail: function () {
                            $(eleIns).removeClass('b-city-relocing');
                            $(eleIns).find('span').text('重新定位');
                            me._setLocBtn({
                                name: '定位失败',
                                code: '',
                                disable: true
                            });
                        }
                    });
                }
            });
        },
        renderSearchList: function (list, query) {
            var str = '';
            list.forEach(function (e, j) {
                str += '<div class="b-city-search-item';
                if (j + 1 < list.length) {
                    str += ' c-line-bottom';
                }
                str += '" data-val=' + e.code + '>';
                var name = e.name.replace(query, '<span class="c-color-gray">' + query + '</span>');
                str += name;
                str += '</div>';
            });
            this.$('.b-city-sug').html(str);
        },
        timer: null,
        // 当前回话的搜索历史
        // 关闭页面后即失效
        // 类似于sessionStorage
        history: [],
        _showLargeChar: function (char) {
            this.timer && clearTimeout(this.timer);
            var $largeChar = this.$('.b-city-large-char');
            $largeChar.text(char).show();
            this.timer = setTimeout(function () {
                $largeChar.hide();
            }, 1000);
        },
        open: function () {
            var $wrapper = this.$('.b-city-wrapper');
            $wrapper.css({
                'transform': 'translate3d(100%, 0, 0)',
                '-webkit-transform': 'translate3d(100%, 0, 0)'
            }).show();
            Naboo.moveX($wrapper.get(0), 0, 200, 'ease').start(function () {
                $wrapper.css({
                    'transform': 'none',
                    '-webkit-transform': 'none'
                });
            });
        },
        close: function () {
            this.$('.b-city-wrapper').hide();
            this.trigger('closed');
        },
        detached: function () {
            Spark.dispose();
        },
        // attached dom之后绑定事件
        attached: function () {
            var self = this;
            self.$('.b-city-slotwrap').on('click', function () {
                self.open();
            });
        }
    });

    return BCity;
});
/*eslint-enable */
