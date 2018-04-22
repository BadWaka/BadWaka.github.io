/**
 * @file b-player
 * @author  zhaolei09
 * @date 2016-11-30
 */

/* globals Box, page */

define(function (require) {

    var register = require('../deps/fusion.best');
    var Naboo = require('../deps/naboo');
    var Spark = require('../deps/spark');
    require('../deps/aio');

    var BPlayer = register('b-player', {
        css: "/** * @file 播放器组件样式 * @author zhaolei09 * @description 通过fis的__inline编译到js中 *//*video 标签*/.b-player-video {  width: 100%;}/*ios为全屏播放，当前ui中不显示视频*//*设置父级节点为position: relative || absolute，视频定位在居中位置，可从容器中间展开全屏播放*/.b-player-box-ios {  position: absolute;  top: 50%;  left: 50%;  width: 1px;  height: 1px;  overflow: hidden;  z-index: -1;}.b-player-box-ios video {  width: 1px;  height: 1px;}/*android 全屏弹窗容器*/.b-player-popup video {  width: 100%;  max-height: 70%;  position: absolute;  top: 50%;  left: 50%;  margin-left: -50%;  visibility: hidden;  /*display: none;*/}.b-player-popup .b-player-popup-content {  height: 100%;}.b-player-popup .c-loading {  position: absolute;  top: 0;  left: 0;  right: 0;  bottom: 0;  margin: auto;  height: 54px;}.b-player-popup .c-loading i::before {  border-top-color: #aaa;}/*fusion组件间无法调用 拷贝一份样式 START*//*最外层wrapper*/.b-player-popup-wrapper {  z-index: 900;}/*遮罩*/.b-player-popup-mask {  display: none;  position: fixed;  left: 0;  top: 0;  opacity: 0;  width: 100%;  height: 100%;  background: rgba(0, 0, 0, 0.5);  z-index: 901;}/*head和content的外层容器*/.b-player-popup-modal {  display: none;  background: #000;  color: #fff;  position: fixed;  height: 100%;  left: 0;  bottom: 0;  top: 0;  width: 100%;  z-index: 902;  margin: 0;  overflow: hidden;  -webkit-transform: translate3d(0, 100%, 0);  transform: translate3d(0, 100%, 0);}/*头部*/.b-player-popup-head {  font-size: 18px;  margin: 10px 26px;}/*title*/.b-player-popup-title {  overflow: hidden;  white-space: nowrap;  text-overflow: ellipsis;}/*remove按钮*/.b-player-popup-remove {  line-height: 17px;  position: absolute;  right: 8px;  top: 10px;}/*内容*/.b-player-popup-content {  text-align: center;  margin: 0 26px 10px;}/*fusion组件间无法调用 拷贝一份样式 END*/",
        props: {
            // 视频播放地址
            src: {
                type: String,
                value: ''
            },
            poster: {
                type: String,
                value: ''
            },
            title: {
                type: String,
                value: ''
            },
            height: {
                type: String,
                value: '100%'
            },
            /**
             * @param {Object}              opt.ios   可选 单独配置ios下某个表现形式
             *
             * @param {boolean}             opt.ios.playMode  可选 播放模式
             *** 播放模式字段值说明：
             *** hide 容器中对video的显示进行隐藏 （ios默认为全屏播放，针对ui设定 当前播放区域不显示video）
             *** false || undefined 不使用插件带有的播放容器样式
             *
             * @param {boolean}             opt.ios.playInBox  可选 手百 ios 是否使用native播放器
             *** false 默认值 使用ios系统自带播放器
             *** true 使用手百native播放器
             **/
            ios: {
                type: Object,
                value: {
                    playMode: false,
                    playInBox: false
                }
            },
            /**
             * @param {Object}              opt.android   可选  单独配置android下某个表现形式
             *
             * @param {boolean}             opt.android.playMode  可选 播放模式
             *** 播放模式字段值说明：
             *** fullsreen 全屏 (android模拟全屏播放)
             *** false || undefined 不使用插件带有的播放容器样式
             **/
            android: {
                type: Object,
                value: {
                    playMode: false
                }
            },
            // 是否关闭搜索结果页日志发送 默认为false
            closeSendLog: {
                type: Boolean,
                value: false
            },
            // 页面中是否只存在唯一的播放器 默认为true
            uniquePlayer: {
                type: Boolean,
                value: true
            },
            // video节点要插入的容器选择器
            boxSelector: {
                type: String,
                value: ''
            }
        },
        playLastTime: 0,
        init: function() {
            var self = this;
            var opt = self.getProp();
            var ua = navigator.userAgent;
            self.video = '<video class="b-player-video" src="" type="video/mp4"'
                        + ' autoplay="autoplay" controls="" poster="" preload="none"></video>';
            self.$video = $(self.video);
            self.video = self.$video[0];
            // 播放器是否在工作，pause也算工作状态
            self.isWorking = false;

            if (opt.height) {
                self.$video.attr('height', opt.height);
            }
            self.bindEvents();
            this.playstart = true;
            if (!opt.closeSendLog) {
                this.sendLog();
            }
        },
        bindEvents: function() {
            var self = this;
            self.$video.on('loadeddata', function() {
                self.video.play();
            });
            self.$video.on('timeupdate', function() {
                for (var s in self.timeEvents) {
                    if (self.timeEvents.hasOwnProperty(s)) {
                        var th = self.timeEvents[s];
                        var currentTime = Math.ceil(self.video.currentTime);
                        var duration = self.getVideoTime();
                        if (th && duration && (currentTime / duration >= th)) {
                            self.trigger(s);
                            self.timeEvents[s] = 0;
                        }
                    }
                }
            });
        },
        // 关键播放时间点设置
        setTimeEvents: function() {
            this.timeEvents = {
                dataready: 0.0000001,
                onefifth: 0.2,
                fourfifths: 0.8,
                onehalf: 0.5,
                playend: 1
            };
        },

        // 初始化一些参数设置
        initParams: function () {
            var self = this;
            self.dataready = 0;
            self.playedInBox = false;
        },

        play: function(opt) {
            // 防止连续快速点击
            if (new Date().getTime() - this.playLastTime < 1000) {
                return;
            }
            this.playLastTime = new Date().getTime();
            var self = this;
            opt = opt || {};

            var options = $.extend({}, self.getProp(), opt);

            // 页面中是否只存在唯一的播放器
            if (options.uniquePlayer) {
                self.removeAll();
            }

            self.initParams();

            // 设置 - 取消自动播放
            // 解决魅族 自带浏览器 android全屏播放时 无法显示画面问题
            // 等插入video后 触发播放
            if ((!$.os || !$.os.ios) && options.android
                && options.android.playMode === 'fullscreen'
                && (navigator.userAgent.indexOf('; MZ-PRO ') > -1 || navigator.userAgent.indexOf('; MX4 Pro ') > -1)) {
                opt.playAfterappend = true;
            }

            // 插入视频节点
            self.appendVideo(opt);

            self.setTimeEvents();

            // 控制播放器播放
            // 手百 ios 8.0 以上调用客户端播放器播放，不需再次触发play
            if (!self.playedInBox && !opt.playAfterappend) {
                self.playSingle();
            }

            self.isWorking = true;
            // send start log
            self.playstart = true;
        },

        // 控制播放器播放
        playSingle: function () {
            var self = this;
            var uaReg = /(iphone.+mqqbrowser)|(android.*(baidubrowser)|(baiduboxapp))/i;
            if (navigator.userAgent.match(uaReg)) {
                setTimeout(function() {
                    self.video.play();
                }, 30);
            } else {
                self.video.play();
            }
        },

        // 设置视频相关信息
        setVideo: function (options) {
            var video = this.$video;

            if (options.height || options.height === 0) {
                this.$video.attr('height', options.height);
            } else {
                this.video.removeAttribute('height');
            }

            // 设置 - 取消自动播放
            // 解决魅族 自带浏览器 android全屏播放时 无法显示画面问题
            if (options.playAfterappend) {
                this.video.removeAttribute('autoplay');
            }

            // 设置视频资源地址
            video.attr('src', options.src || '');

            // 设置视频封面
            video.attr('poster', options.poster || '');
        },

        // 插入视频节点，根据playmode参数进行不同的设置
        appendVideo: function (opt) {
            var self = this;
            var video = self.$video;

            // 设置参数
            var options = $.extend({}, self.getProp(), opt);

            // 使用手百NA播放器，此处代码需要放置在最前面，否则会导致被系统自带播放器覆盖的情况
            // 获取UA
            // 手百 ios 8.0以上版本 则使用手百自带播放器
            if (options.ios && options.ios.playInBox && window.Box && window.Box.isBox &&  window.Box.utils
                && $.os && $.os.ios) {
                var curver = Box.utils.getVersion();
                var minver = '8.0.0.6';
                var versionCompare = Box.utils.version_compare;
                if (versionCompare(curver, minver) >= 0) {
                    try {
                        self.playedInBox = true;
                        self.playInBox(options);
                        return;
                    } catch(e) {
                        self.playedInBox = false;
                    }
                }
            }

            var container = $(self.element);

            // 若存在video 要插入的容器 则使用，   默认为b-player
            if (options.boxSelector && $(options.boxSelector) && $(options.boxSelector).length) {
                container = $(options.boxSelector);
            }

            // 设置视频相关信息
            self.setVideo(options);

            // 如果设置了playMode 且 ios 进行如下操作
            // ios不区分fullscreen || inline, 均为为默认系统全屏播放
            if ($.os && $.os.ios && options.ios && options.ios.playMode === 'hide') {
                var html = $('<div class="b-player-box-ios"></div>').append(video);
                container.length && container.append(html);
                return;
            }

            // 非ios下
            // 全屏播放
            if ((!$.os || !$.os.ios) && options.android
                && options.android.playMode === 'fullscreen') {
                video.off('dataready').on('dataready', function () {
                    self.dataready = 1;
                });
                self.fullsreenForAndriod(opt);
                return;
            }

            // 非ios下
            // 当前区域播放
            // 暂无当前播放规范 尚未开发
            // if (options.playMode === 'inline') {

            // }

            // 如果未设置playMode 则只会简单的插入video节点
            container.length && container.append(video);
        },

        fullsreenForAndriod: function (opt) {
            var self = this;
            var video = self.$video;

            // 设置参数
            var options = $.extend({}, self.getProp(), opt);

            // 引用通用弹窗组件
            require(['./popup'], function (Popup) {
                var popup = new Popup({
                    title: options.title || '',
                    content: '<div class="c-loading">\
                                <i class="c-icon">&#xe780</i>\
                                <p>加载中...</p>\
                            </div>',
                    fullView: true,
                    customClassName: 'b-player-popup',
                    onOpen: function () {
                        // 设置 - 取消自动播放
                        // 解决魅族 自带浏览器 android全屏播放时 无法显示画面问题
                        // 等插入video后 触发播放
                        if (options.playAfterappend) {
                            addVideo();
                            self.playSingle();
                            self.dataready = 1;
                        // webkit核下 android浏览器 加载较慢 会展示控制条体验问题 增加loading优化
                        } else if (self.dataready === 1) {
                            addVideo();
                        } else {
                            video.off('dataready').on('dataready', function () {
                                addVideo();
                                self.dataready = 1;
                            });
                        }

                        // 如果超过某个时间（6s） 还未展示 则立即展示出来
                        clearLoadingTimer();
                        self.loadingTimer = setTimeout(function () {
                            if (self.dataready !== 1) {
                                addVideo();
                                self.dataready = 1;
                            }
                        }, 6000);
                    },
                    onClose: function () {
                        // 初始化
                        $(window).off('orientationchange.playvideosize');
                        self.initStyle();
                        clearLoadingTimer();
                    }
                });

                // 清除loading异常timer
                function clearLoadingTimer() {
                    if (self.loadingTimer) {
                        clearTimeout(self.loadingTimer);
                        self.loadingTimer = null;
                    }
                }
                // 添加视频节点
                function addVideo() {
                    if (popup.$popupContent && popup.$popupContent.length
                        && popup.$popupContent.find('video') && popup.$popupContent.find('video').length) {
                        return;
                    }
                    popup.$popupContent.html(video);

                    // 关闭按钮距离上方的距离
                    var freesize = 0;
                    var remove = $('.b-player-popup .b-player-popup-remove');
                    if (remove.length) {
                        freesize = remove.height() + remove.offset().top + 5;
                    }

                    // 屏幕旋转后，设置video的位置和尺寸
                    $(window).off('orientationchange.playvideosize resize.playvideosize')
                        .on('orientationchange.playvideosize resize.playvideosize', function () {
                            self.calculateVideo({
                                freesize: freesize
                            });
                        });

                    // 设置video的位置和尺寸
                    self.calculateVideo({
                        freesize: freesize
                    });
                }

                // 解决android手百关闭时页面抖动问题  待popup组件升级后更改 @士浩
                var remove = $('.b-player-popup .b-player-popup-remove, .b-player-popup-modal');
                remove.length && remove.off('click.playvideo')
                    .on('click.playvideo', function (e) {
                        // 如果点击的是video 则不会清除关闭弹窗
                        if (e.target.tagName === 'VIDEO') {
                            e.stopPropagation();
                            return;
                        }
                        popup.$popupContent.length && popup.$popupContent.html('');
                    });
            });
        },

        initStyle: function () {
            var self = this;
            var video = self.$video;
            video.removeAttr('style');
        },

        // android全屏时计算video的高度和位置
        // @param {boolean}    params.freesize  可选 上下需要空闲出来的尺寸
        calculateVideo: function (params) {
            var self = this;
            var video = self.$video;
            var params = params || {};

            // 初始化样式避免被设定影响
            self.initStyle();

            setTimeout(function () {
                var winHeight = $(window).height();
                var winWidth = $(window).width();
                var freesize = params.freesize || 0;
                var h = video.height();

                if (winHeight <= winWidth) {
                    h = winHeight - freesize * 2;
                }
                video.css({
                    'height': h + 'px',
                    'margin-top': - h / 2 + 'px',
                    'visibility': 'visible'
                });
            }, 10);
        },

        // 在手百中播放时 调用手百播放器 目前只限ios端
        // params.vid 视频唯一id     可选
        // params.src 视频资源地址   可选
        // params.title 视频标题     必填
        playInBox: function (params) {
            var url = params.src;
            if (!url) {
                return;
            }

            if (url.indexOf('//') === 0) {
                url = location.protocol + url;
            }

            require('../deps/aio');

            var options = {
                vid: params.vid || '',
                isHalfScreen: false,
                title: params.title || '',
                src: url,
                pageUrl: location.href,
                videoUrl: url,
                ubcMonitorInfo: {}
            };

            options = JSON.stringify(options);
            if (window.Box && window.Box.os && window.Box.os.ios) {
                Box.ios.invokeApp("video", {
                    "action": "invokePlayer",
                    "params": encodeURIComponent(options),
                    "minver": "8.0.0.6"
                });
            }
        },
        pause: function() {
            this.video.pause();
        },
        remove: function() {
            this.$video.remove();
            this.isWorking = false;
        },
        // 移除页面中所有其他b-player
        removeAll: function () {
            var playerList = $('b-player');
            var self = this;
            playerList.each(function () {
                this.fusion.remove();
            });
        },
        // 获取视频时长
        getVideoTime: function() {
            return Math.ceil(this.video.duration);
        },
        off: function(name) {
            this.$video.off(name);
        },
        on: function(name, fn) {
            this.$video.on(name, fn);
        },
        trigger: function(name) {
            this.$video.trigger(name);
        },
        // 增加video webb统计
        // 参数参考http://webb.baidu.com/wise-wiki 视频播放组件
        sendLog: function () {
            var self = this;
            self.on('play', function() {
                // send start log
                if (self.playstart) {
                    self.playstart = false;
                    self._sendLog({
                        action: 'start',
                        ext: {
                            pgrs: 0
                        }
                    });
                    // do it for UC browser, start play currentTime = duration 's bug
                    setTimeout(function () {
                        // when continue play, bind events
                        self.setTimeEvents();
                    }, 500);
                } else {
                    self._sendLog({
                        action: 'cont',
                        ext: {
                            pgrs: self.computePlayPgrs()
                        }
                    });
                }
            });
            self.on('onehalf', function() {
                self._sendLog({
                    action: 'pgrs',
                    ext: {
                        pgrs: 0.5
                    }
                });
            });
            self.on('pause', function() {
                if (!self.video.ended) {
                    var pgrs = self.computePlayPgrs();
                    // do it for baidu browser
                    if (parseInt(pgrs, 10) >= 1) {
                        return;
                    }
                    self._sendLog({
                        action: 'pause',
                        ext: {
                            pgrs: pgrs
                        }
                    });
                }
            });
            self.on('playend', function() {
                self.playstart = true;
                self._sendLog({
                    action: 'end',
                    ext: {
                        pgrs: 1
                    }
                });
            });
        },
        computePlayPgrs: function () {
            var self = this;
            var currentTime = Math.ceil(self.video.currentTime) || 0;
            var duration = self.getVideoTime() || 0;
            return (currentTime / duration).toFixed(1);
        },
        // 结果页_sendLog方法,依赖page.webb.ia.send方法
        _sendLog: function (logInfo) {
            var _this = this;
            if (!logInfo) {
                return;
            }
            var videoLogData = {
                type: 'wp_vd',
                action: 'start',
                ext: {
                   pgrs: 0
                }
            };
            if (window.page && typeof page == 'object' && page.webb && page.webb.ia && page.webb.ia.send) {
                var obj = $.extend({}, videoLogData, logInfo);
                // 结果页日志发送接口
                // console.log(obj);
                page.webb.ia.send(obj);
            }
        }
    });

    return BPlayer;
});
