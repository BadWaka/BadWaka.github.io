/**
 * @file 分享组件
 * @author  zhulei05
 * @date 2016-10-28
 */

// fecs豁免如下全局变量

/* globals Box, ucweb, ucbrowser, page, browser */

/* eslint-disable */
define (function (require) {

    var register = require('../deps/fusion.best');
    var detect = require('../deps/detect');
    var BPopup = require('../b-popup/b-popup');
    require('../deps/aio');

    /* eslint-enable */
    // 加载公共css
    var $popupStyle = $('<style data-for="fusion/b-share"></style>');

    /* eslint-disable */
    $popupStyle.text('.b-share-popup-wrapper{z-index:900}.b-share-popup-mask{display:none;position:fixed;left:0;top:0;opacity:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:901}.b-share-popup-modal{display:none;position:fixed;left:0;width:100%;background-color:#f1f1f1;z-index:902;margin:0;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.b-share-popup-head{display:none;font-size:18px;margin:10px 26px}.b-share-popup-title{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.b-share-popup-remove{line-height:17px;position:absolute;right:8px;top:10px}.b-share-popup-content{text-align:center;margin:0 auto;padding-top:20px;}');

    /* eslint-enable */
    $('head').append($popupStyle);

    // 存在sf页面点击dom
    var sfclickDom;

    var PopupFrame = function ($dom, opt) {
        var me = this;
        // 设置默认值
        me.options = $.extend({
            title: '', // 标题，支持html和Zepto对象
            content: '', // 内容，支持html和Zepto对象
            fullView: false, // 是否全屏
            duration: 400, // 动画执行时间
            customClassName: '', // 自定义样式名
            onOpen: function () {},
            onClose: function () {}
        }, opt);
        // 初始化
        me._init($dom);
    };

    PopupFrame.prototype = {

        constructor: PopupFrame,

        version: '0.0.1',

        /**
        *  初始化：渲染父层dom，阻止遮罩的滚动，弹出popup
        *  @param {string} $dom 传入dom
        *  @private
        */
        _init: function ($dom) {
            var me = this;
            // 渲染父层dom单例
            me._preparePopupWrapper($dom);
            // 阻止遮罩滚动
            me._stopScroll();
            me.popup();
        },

        /**
         * 创建.b-share-popup-wrapper父容器单例,所有pop内容都append到这个dom中
         *  @param {string} $dom 传入dom
         *  @private
         */
        _preparePopupWrapper: function ($dom) {
            var me = this;
            $('.b-share-popup-wrapper').detach();
            me.$popupFrame = $('<div class="b-share-popup-wrapper"></div>');
            $dom.append(me.$popupFrame);
        },

        /**
        *  阻止mask以及结果层的滚动
        *  @private
        */
        _stopScroll: function () {
            var me = this;
            // 阻止遮罩层滚动,不会影响内部touchmove事件
            me.$popupFrame.on('touchmove', function (e) {
                e.preventDefault();
            });
        },

        /**
        * 父层事件绑定
        * @private
        */
        _bindEvent: function () {
            var me = this;
            // 结果页异步时需要消除事件
            if (window.page && page.on) {
                page.on('destroy', function () {
                    screenshotShare.clearData();
                });
            }

            // mask遮罩和绑定退场事件
            me.$popupFrame.on('click', '.b-share-popup-mask,.b-share-popup-remove', function () {
                me.closePopup();
            });
        },

        /**
        * 装填&&渲染
        * @private
        */
        _randerContent: function () {
            var me = this;
            // 遮罩层
            me.$popupMask = $('<div class="b-share-popup-mask"></div>');
            // modal层
            me.$popupModal = $('<div class="b-share-popup-modal"></div>');
            // modal内content
            me.$popupContent = $('<div class="b-share-popup-content"></div>');
            // modal内head
            me.$popupHead = $('<div class="b-share-popup-head"></div>');
            // 装填head内容
            if (me.options.title) {
                var titleWrapper = $('<div class="b-share-popup-title"></div>');
                titleWrapper.append(me.options.title);
                me.$popupHead.append(titleWrapper);
            }

            var remove = $('<div class="b-share-popup-remove c-icon">&#xe61a</div>');
            me.$popupHead.append(remove);
            // 装填content
            me.$popupContent.append(me.options.content);
            // 装填modal
            me.$popupModal.append(me.$popupHead).append(me.$popupContent).addClass(me.options.customClassName);
            // 最后装填外层wrapper
            me.$popupFrame.append(me.$popupModal).append(me.$popupMask);
        },

        /*
        * 弹出层
        */
        popup: function () {
            var me = this;
            var wHeight = $(window).height();
            me._randerContent();
            me._bindEvent();
            // mask淡入
            me.$popupMask.height(wHeight).show().animate({
                opacity: 1
            }, 'fast', 'ease');
            // 展现modal
            me.$popupModal.css('top', wHeight).show();
            // 计算modal实际高度
            var mHeight = me.$popupModal.height();
            if (me.options.fullView || mHeight > wHeight) {
                me.$popupModal.height(wHeight);
            }

            // 入场动画
            me.$popupModal.animate({
                '-webkit-transform': 'translate3d(0, -100%, 0)',
                'transform': 'translate3d(0, -100%, 0)'
            }, me.options.duration, 'ease', function () {
                me.options.onOpen();
            });
        },

        /*
        * 关闭弹层
        */
        closePopup: function () {
            var me = this;
            // 退场动画
            me.$popupModal.animate({
                '-webkit-transform': 'translate3d(0, 0, 0)',
                'transform': 'translate3d(0, 0, 0)'
            }, me.options.duration, 'ease', function () {
                $(this).hide();
                me.options.onClose();
                me._destroy();
            });
            // mask淡出
            me.$popupMask.animate({
                opacity: 0
            }, 'fast', 'ease', function () {
                $(this).hide();
            });
            // 关闭弹层清楚数据
            screenshotShare.clearData();
        },

        /**
        * 解绑事件&清除dom
        * @private
        */
        _destroy: function () {
            var me = this;
            // 解绑事件
            me.$popupFrame.off('click', '.b-share-popup-mask,.b-share-popup-remove');
            // 清除dom
            me.$popupFrame.empty();
        }
    };

    // 获取当前客户端信息
    var OS = detect.os;
    var Browser = detect.browser;
    // ios手百8.4分享功能有问题，先降级到h5版本
    // var isZbios = (Browser.n == 'zbios') ? 1 : 0;

    /* eslint-disable */
    var isZbios = (Browser.n === 'zbios' && !(detect.os.n === 'ios' && navigator.userAgent.indexOf('baiduboxapp/0_01.0.4.8') > -1)) ? 1 : 0;

    /* eslint-enable */
    var isUC = (Browser.n === 'uc' && (typeof (ucweb) !== 'undefined' || typeof (ucbrowser) !== 'undefined')) ? 1 : 0;
    var isQQ = (Browser.n === 'qq' && Browser.v && Browser.v > '5.4') ? 1 : 0;
    var isWechat = (Browser.n === 'wechat') ? 1 : 0;

    // 手百版本;
    var boxVersion = Box && Box.version && parseFloat(Box.version);

    // 在qq浏览器5.4版本以上需要加载qq shareapi

    /* eslint-disable */
    var dtd = $.Deferred();

    /* eslint-enable */
    if (isQQ) {
        // zepto $.ajax在qq浏览器上无法加载这个api url,永远返回fail,jquery以及直接请求均可以,原因不明,采用原生方法实现异步加载
        // TODO: 查清原因！！！！！！！！！
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                dtd.resolve();
            }

        };
        script.src = '//jsapi.qq.com/get?api=app.share';
        $('head').append(script);
    }

    // 手百分享接口
    // 分享到 QQ 控件的 URL 长度限制2014个字符，超长会分享失败
    var nativeShare = function (cfg, encode) {
        var onSuccess = function () {};
        var onFail = function () {};
        if (encode) {
            cfg.url = encodeURIComponent(cfg.url);
            cfg.linkUrl = encodeURIComponent(cfg.url);
        }

        if (Box.os.android) {

            /* eslint-disable */
            Box.android.invokeApp('Bdbox_android_utils', 'callShare', [JSON.stringify(cfg), window.successFnName || 'console.log', window.errorFnName || 'console.log']);

        /* eslint-enable */
        }
        else {
            Box.ios.invokeApp('callShare', {
                options: encodeURIComponent(JSON.stringify(cfg)),
                errorcallback: 'onFail',
                successcallback: 'onSuccess'
            });
        }
    };

    // UC分享接口
    var ucShare = function (toApp, opt) {
        var ucAppList = {
            sinaweibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
            wxfriend: ['kWeixin', 'WechatFriends', 1, '微信好友'],
            pyq: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
            qqfriend: ['kQQ', 'QQ', '4', 'QQ好友'],
            qzone: ['kQZone', 'QZone', '3', 'QQ空间']
        };

        var url = opt.url;
        var title = opt.title;
        var from = '';
        var img = '';
        var desc = opt.content;

        toApp = toApp === '' ? '' : (OS.n === 'ios' ? ucAppList[toApp][0] : ucAppList[toApp][1]);

        // 安卓uc qq空间分享特殊逻辑
        // 伪协议失效，目前该伪协议只能打开QQ apk，并不能打开分享页面，uc端调用的sdk方法未知
        // if (toApp == 'QZone') {
        //     B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url="+img+"&title="+title+"&description="+desc+"&url="+url+"&app_name="+from;
        //     k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
        //         k && k.parentNode && k.parentNode.removeChild(k)
        //     }, 5E3);
        // }

        if (typeof (ucweb) !== 'undefined') {
            // 判断ucweb方法是否存在,安卓uc中可以使用
            ucweb.startRequest('shell.page_share', [title, title, url, toApp, '', '@' + from, '']);
        }
        else if (typeof (ucbrowser) !== 'undefined') {
            // 判断ucbrowser方法是否存在,ios uc中可以使用
            ucbrowser.web_share(title, title, url, toApp, '', '@' + from, '');
        }

    };

    // QQ浏览器分享接口
    var qqShare = function (toApp, opt) {
        var qqAppList = {
            sinaweibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
            wxfriend: ['kWeixin', 'WechatFriends', 1, '微信好友'],
            pyq: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
            qqfriend: ['kQQ', 'QQ', '4', 'QQ好友'],
            qzone: ['kQZone', 'QZone', '3', 'QQ空间']
        };

        /* eslint-disable */
        toApp = toApp === '' ? '' : qqAppList[toApp][2];
        var ah = {
            url: opt.url,
            title: opt.title,
            description: opt.content,
            img_url: '',
            img_title: '',
            to_app: toApp, // 微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
            cus_txt: '请输入此时此刻想要分享的内容'
        };

        /* eslint-enable */
        ah = toApp === '' ? '' : ah;

        // qq share api加载完毕后执行
        $.when(dtd).done(function () {
            if (typeof (browser) !== 'undefined' && typeof (browser.app) !== 'undefined') {
                browser.app.share(ah);
            }

        });
    };

    // 微信显示分享提示浮层
    var TIME;
    var wechatTips = function () {
        if ($('.b-share-wechat-tips').length) {
            $('.b-share-wechat-tips').show();
        }
        else {
            $('body').append($('<div class="b-share-wechat-tips"></div>'));
            $('.b-share-wechat-tips').on('click', function () {
                $(this).hide();
                clearTimeout(TIME);
            });
        }

        TIME = setTimeout(function () {
            $('.b-share-wechat-tips').hide();
            clearTimeout(TIME);
        }, 2000);
    };

    /* 生成短链接 */
    var getShotLink = function (url) {

        /* eslint-disable */
        var det = $.Deferred();

        /* eslint-enable */
        var requrl = 'http://mysearch.pae.baidu.com/api/s';

        if (window.location.protocol === 'https:') {
            requrl = 'https://sp0.baidu.com/5LMDcjW6BwF3otqbppnN2DJv/mysearch.pae.baidu.com/api/s';
        }

        $.ajax({
            url: requrl,
            type: 'GET',
            timeout: 1000,
            dataType: 'jsonp',
            jsonp: 'cb',
            data: {
                params: JSON.stringify([url])
            }
        })
            .done(function (data) {
                if (data && data.status === '0' && data[url]) {
                    det.resolve(data[url]);
                }
                else {
                    det.resolve(url);
                }
            })
            .fail(function () {
                det.resolve(url);
            });

        return det.promise();
    };

    /* 微信分享复制链接提醒 */
    var copyLinkTip = function (url) {
        var that = this;
        $.when(getShotLink(url)).then(function (shoturl) {
            var closeBtnCls = 'b-share-copytip-cancel-btn-' + Date.now();
            var copyBtnCls = 'b-share-copytip-link-' + Date.now();

            /* eslint-disable */
            var html = [
                '<div class="b-share-copytip-content">',
                '<div class="b-share-copytip-text">长按复制下方链接，去粘贴给好友吧：</div>',
                '<div class="b-share-copytip-linkwr"><a class="b-share-copytip-link ' + copyBtnCls + '" href="' + shoturl + '" target="_blank">' + shoturl + '</a></div>',
                '</div>',
                '<div class="b-share-copytip-cancel-btn ' + closeBtnCls + '">取消</div>'
            ].join('');

            /* eslint-enable */

            var copyLinkPopup = new PopupFrame($('body'), {
                content: html,
                fullView: false,
                onClose: function () {
                    that.trigger('close');
                }
            });

            $('.' + closeBtnCls).on('click', function () {
                copyLinkPopup.closePopup();
            });

            $('.' + copyBtnCls).on('click', function () {
                return false;
            });
        });
    };

    // 朋友圈分享按钮配置
    var pyq = {
        key: 'pyq',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/pyq_2.png',
        title: '朋友圈',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'weixin_timeline';
                    nativeShare(opt, false);
                };
            }
            else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('pyq', opt);
                };
            }
            else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('pyq', opt);
                };
            }
            else if (isWechat) {
                fn = function (opt) {
                    wechatTips();
                };
            }
            else {
                fn = function (opt) {
                    copyLinkTip.call(this, opt.url);
                };
            }
            return fn;
        })()
    };

    // 微信好友分享按钮配置
    var wxfriend = {
        key: 'wxfriend',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/wxfriend_2.png',
        title: '微信好友',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'weixin_friend';
                    nativeShare(opt, false);
                };
            }
            else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('wxfriend', opt);
                };
            }
            else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('wxfriend', opt);
                };
            }
            else if (isWechat) {
                fn = function (opt) {
                    wechatTips();
                };
            }
            else {
                fn = function (opt) {
                    copyLinkTip.call(this, opt.url);
                };
            }
            return fn;
        })()
    };

    // qq好友分享按钮配置
    var qqfriend = {
        key: 'qqfriend',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/qqfriend_2.png',
        title: 'QQ好友',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'qqfriend';
                    nativeShare(opt, false);
                };
            }
            else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('qqfriend', opt);
                };
            }
            else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('qqfriend', opt);
                };
            }
            else {
                fn = function (opt) {
                    copyLinkTip.call(this, opt.url);
                };
            }
            return fn;
        })()
    };

    // qq空间分享按钮配置
    var qzone = {
        key: 'qzone',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/qzone_2.png',
        title: 'QQ空间',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'qqdenglu';
                    nativeShare(opt, false);
                };
            }
            else if (isUC && OS.n === 'ios') {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('qzone', opt);
                };
            }
            else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('qzone', opt);
                };
            }
            else {
                // 普通浏览器
                fn = function (opt) {
                    // 用sns.qzone.qq.com这个域名会发生一次跳转，url会超长
                    // var qqUrl = 'url=' + encodeURIComponent(opt.url) + '&summary=' + opt.content + '&title=' + opt.title + '&pics=' + encodeURIComponent(opt.iconurl);
                    // window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + qqUrl);

                    /* eslint-disable */
                    var qqUrl = 'url=' + encodeURIComponent(opt.url) + '&imageUrl=' + encodeURIComponent(opt.iconurl) + '&summary=' + opt.content + '&title=' + opt.title;

                    /* eslint-enable */
                    window.open('http://qzs.qzone.qq.com/open/connect/widget/mobile/qzshare/index.html?' + qqUrl);
                };
            }
            return fn;
        })()
    };

    // 新郎微博分享按钮配置
    var sinaweibo = {
        key: 'sinaweibo',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/sinaweibo_2.png',
        title: '新浪微博',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'sinaweibo';
                    nativeShare(opt, false);
                };
            }
            else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('sinaweibo', opt);
                };
            }
            else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('sinaweibo', opt);
                };
            }
            else {
                // 普通浏览器
                fn = function (opt) {
                    window.open('http://v.t.sina.com.cn/share/share.php?url=' + encodeURIComponent(opt.url) + '&title=' + encodeURIComponent(opt.title));
                };
            }
            return fn;
        })()
    };

    var more = {
        key: 'more',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/more_2.png',
        title: '更多',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'all';
                    nativeShare(opt, false);
                };
            }
            else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('', opt);
                };
            }
            else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('', opt);
                };
            }

            return fn;
        })()
    };

    var BShare = register('b-share', {

        /* eslint-disable */
        css: '/* 分享列表容器 */.b-share-list {  overflow: hidden;}.b-share-list .c-flexbox:not(:first-of-type) {  margin-top: 12px;}.b-share-list .b-share-btn {  width: 50px;  -webkit-box-flex: 1;  -webkit-flex: 1 1 auto;  color: #666;  text-align: center;  font-size: 13px;  line-height: 1;}.b-share-list .b-share-btn .c-img {  max-width: 50px;  margin: 0 auto;  background: #fff;  border: 1px solid #f0f0f0;  border-radius: 50%;}/* 分享取消按钮,只在popup打开时展现 */.b-share-cancel-btn,.b-share-copytip-cancel-btn {  width: 100%;  margin-top: 20px;  color: #333;  font-size: 16px;  line-height: 48px;  background: #f8f8f8;  border-top: #eaeaea 1px solid;}/* 微信分享提示tips */.b-share-wechat-tips {  position: fixed;  top: 0;  left: 0;  z-index: 999;  width: 100%;  height: 100%;  background: rgba(0, 0, 0, 0.6) url(//m.baidu.com/se/static/pmd/pmd/share/images/wxtips.png) right 32px top 10px no-repeat;  background-size: 50%;}.b-share-list .b-share-btn {  width: 60px;  font-size: 11px;}.b-share-list .b-share-btn .c-img {  max-width: 60px;}.b-share-list .c-flexbox:not(:first-of-type) {  margin-top: 28px;}/* 复制链接提示 */.b-share-copytip-content {  padding: 0 20px;  color: #333;  text-align: left;}.b-share-copytip-text {  font-size: 16px;  margin-bottom: 10px;}.b-share-copytip-linkwr {  padding: 7px 10px;  font-size: 14px;  line-height: 21px;  border: 1px dotted #d9d9d9;  word-break: break-all;}.b-share-copytip-link:visited,.b-share-copytip-link {  color: #333;}/*增加提交框样式*/.b-share-screenshot-wrapper {  display: none;}/*截图分享tip*/.b-share-toastbox {  z-index: 950;  width: 1.4rem;  height: .50rem;  font-size: .18rem;  color: #ffffff;  border: 1px solid #000;  border-radius: .04rem;  padding: 0;  line-height: .50rem;  text-align: center;  background-color: #000000;  opacity: .8;  filter: alpha(opacity=80);  position: absolute;  left: 0;  right: 0;  top: -0.56rem;  margin: 0 auto;  display: none;}',

        /* eslint-enable */
        tpl: '',
        props: {
            // 是否用popup打开
            usePopup: {
                type: Boolean,
                value: false
            },
            // 要分享的url，默认为当前页面url
            url: {
                type: String,
                value: function () {
                    return window.location.href;
                },
                onChange: function () {
                    this._updateShareData();
                }
            },
            // 自定义的分享标题(QZONE 网页版不支持)
            title: {
                type: String,
                value: '百度搜索有惊喜',
                onChange: function () {
                    this._updateShareData();
                }
            },
            // 自定义的分享内容
            content: {
                type: String,
                value: '',
                onChange: function () {
                    this._updateShareData();
                }
            },
            // 自定义的分享图片
            iconurl: {
                type: String,
                value: 'https://m.baidu.com/se/static/pmd/pmd/share/images/bdu.jpg',
                onChange: function () {
                    this._updateShareData();
                }
            },
            // 文字颜色配置，#333，#666，#999
            color: {
                type: String,
                value: '#666'
            },
            // 分享渠道，可根据需求选择分享哪些渠道，默认['wxfriend', 'pyq', 'qqfriend', 'qzone', 'sinaweibo', 'more']
            channel: {
                type: Array,
                value: ['wxfriend', 'pyq', 'qqfriend', 'qzone', 'sinaweibo', 'more']
            },
            // 分享按钮点击时候需要发送的日志内容(只在结果页生效,发tc日志)
            loginfo: {
                type: Object,
                value: {}
            },
            custom: {
                type: Array,
                value: []
            },
            type: {
                type: String,
                value: 'url',
                onChange: function () {
                    this._updateShareData();
                }
            },
            screenshot: {
                type: String,
                value: '',
                onChange: function () {
                    this._updateShareData();
                }
            },
            imageurl: {
                type: String,
                value: '',
                onChange: function () {
                    this._updateShareData();
                }
            }
        },
        // 分享的标题
        title: null,
        // 分享的链接
        url: null,
        linkUrl: null,
        // 分享的内容
        content: null,
        // 分享的图标
        iconurl: null,
        // 分享面板自定义按钮信息
        custom: null,
        // 分享面板按钮列表
        list: null,
        // 分享面板html
        listHTML: null,
        // 日志信息
        loginfo: null,
        sharePopup: null,

        // 分享类型
        type: null,
        // 截屏相关信息
        screenshot: null,
        // 分享图片相关
        imageurl: null,

        init: function () {
            var that = this;

            var $el = $(this.element);
            var obj = this.getProp();

            this._updateShareData();

            var textColor = {
                '#333': 'c-color',
                '#999': 'c-color-gray',
                '#666': ''
            };
            var colorClass = textColor[obj.color];

            var channelConf = {
                wxfriend: wxfriend,
                pyq: pyq,
                qzone: qzone,
                sinaweibo: sinaweibo,
                qqfriend: qqfriend
            };

            this.custom = obj.custom;

            var list = [];

            for (var key in channelConf) {
                if (channelConf.hasOwnProperty(key) && $.inArray(key, obj.channel) !== -1) {
                    list.push(channelConf[key]);
                }

            }

            if (isZbios || isUC || (isQQ && OS.n === 'ios')) {
                ($.inArray('more', this.getProp('channel')) > -1) && list.push(more);
            }

            list = list.concat(obj.custom);

            this.list = list;

            var str = '';
            if ($.type(list) === 'array' && list.length > 0) {
                str += '<div class="b-share-list">';
                var num = list.length;
                var lines = Math.ceil(num / 4);
                for (var j = 0; j < lines; j++) {
                    str += '<div class="c-flexbox">';
                    for (var i = 0; i < 4; i++) {
                        var index = j * 4 + i;
                        var info = list[index];
                        if (info || num > 4) {
                            // 多于4个的时候才需要在第二行补空dom
                            str += '<div class="b-share-btn">';
                        }

                        if (info) {
                            str += '<img class="c-img" src="' + info.icon + '" />';
                            str += '<div class="c-gap-top c-line-clamp1 ' + colorClass + '">' + info.title + '</div>';
                        }

                        if (info || num > 4) {
                            // 多于4个的时候才需要在第二行补空dom
                            str += '</div>';
                        }

                    }
                    str += '</div>';
                }
                str += '</div>';
            }

            this.listHTML = str;

            if (!obj.usePopup) {
                $el.append(str);
            }

            that._bindEvent();
        },

        _updateShareData: function () {
            var obj = this.getProp();

            this.title = obj.title;
            this.loginfo = obj.loginfo;
            this.iconurl = obj.iconurl;
            this.usePopup = obj.usePopup;

            // 设置分享类型
            this.type = obj.type;

            // 设置分享截屏数据
            if (obj.type === 'screenShot' && obj.screenshot) {
                this.screenshot = JSON.parse(obj.screenshot);
            }

            // 设置分享图片数据
            if (obj.type === 'image' && obj.imageurl) {
                this.imageurl = obj.imageurl;
            }

            // 区分ios/安卓可以支持的版本 安卓9.1&&ios 9.0, 如果是不支持版本应该回退到url分享
            var specialType = obj.type === 'image' || obj.type === 'screenShot';
            var SupportBoxIos = isZbios && detect.os.n === 'ios' && boxVersion >= 9;
            var SupportBoxAnd = isZbios && detect.os.n === 'android' && boxVersion >= 9.1;

            if (specialType && !SupportBoxIos && !SupportBoxAnd) {
                this.type = 'url';
            }

            if (!obj.content) {
                obj.content = obj.title;
            }

            this.content = obj.content;

            if (/^\/\/.+/.test(obj.url)) {
                obj.url = 'http:' + obj.url;
            }

            this.linkUrl = this.url = obj.url;
        },

        _getShareData: function () {
            var shareInfo = {
                url: this.url,
                linkUrl: this.linkUrl,
                title: this.title,
                content: this.content,
                iconurl: this.iconurl
            };

            // 如果是图片需要修改 类型以及赋值url
            if (this.type === 'image') {
                shareInfo.type = (isZbios && detect.os.n === 'ios') ? 'image' : 3;
                shareInfo.imageUrl = this.imageurl;
            }

            return shareInfo;
        },

        /**
         * 事件绑定
         * @private
         */
        _bindEvent: function () {
            var that = this;

            var $el = $(this.element);

            $el.on('click', '.b-share-btn', function () {
                var shareInfo = that._getShareData();
                var i = $el.find('.b-share-btn').index($(this));
                if (that.list[i]) {
                    var info = that.list[i];
                    // 如果是截屏分享需要在点击后触发图片获取
                    if (that.type === 'screenShot') {
                        var screenShotConfig = that.screenshot;
                        // 分享外带标识
                        var saStr = '&sa=oa_si&resourceid=' + screenShotConfig.resourceId;
                        screenShotConfig.linkUrl = shareInfo.url + saStr;
                        // 去除微博双title
                        shareInfo.content = '';

                        // 重新定义分享类型 安卓图片分享type 3 ios type image
                        shareInfo.type = (isZbios && detect.os.n === 'ios') ? 'image' : 3;
                        if (screenshotShare.imageUrl !== '') {
                            // 修改分享类型 赋值图片链接
                            shareInfo.imageUrl = screenshotShare.imageUrl;
                            info.cb && info.cb(shareInfo);
                            that._sendLog(info.key);
                            that.trigger('shareClick', {key: info.key, index: i});
                        }
                        else {
                            // 防止按钮多次点击
                            if (screenshotShare.btnLock) {
                                return;
                            }
                            else {
                                screenshotShare.btnLock = true;
                            }
                            // 截图请求ajax异步，采用回调处理
                            screenshotShare(screenShotConfig, function (url) {
                                screenshotShare.btnLock = false;
                                // 修改分享类型 赋值图片链接
                                shareInfo.imageUrl = url;
                                $.when(getShotLink(screenShotConfig.linkUrl)).then(function (shoturl) {
                                    // 图片分享在微博存在没有链接的情况 讲url添加到title上, 处理多次点击未分享导致的title增长
                                    if (shareTitle === shareInfo.title) {
                                        shareInfo.title += ' ' + shoturl;
                                    }

                                    info.cb && info.cb(shareInfo);
                                    that._sendLog(info.key);
                                    that.trigger('shareClick', {key: info.key, index: i});
                                    info = null;
                                });
                            });
                        }
                    }
                    else {
                        info.cb && info.cb.call(that, shareInfo);
                        that._sendLog(info.key);
                        that.trigger('shareClick', {key: info.key, index: i});
                    }
                }

            });

            $el.on('click', '.b-share-cancel-btn', function () {
                that.close();
            });
        },

        /**
         * 结果页_sendLog方法,依赖page.log.send方法
         * @param {string} key 传入对应分享
         * @private
         */
        _sendLog: function (key) {
            var that = this;

            var appKeyList = {
                pyq: {ct: 40, cst: 2},
                wxfriend: {ct: 40, cst: 1},
                qqfriend: {ct: 40, cst: 5},
                qzone: {ct: 40, cst: 3},
                sinaweibo: {ct: 40, cst: 4},
                more: {ct: 40, cst: 9},
                close: {ct: 40, cst: 0} // 关闭
            };
            if (key && appKeyList[key] && typeof page === 'object' && page.log && page.log.send) {
                var obj = appKeyList[key];
                obj = $.extend(obj, that.loginfo);

                // 结果页日志发送接口
                page.log.send(obj);
            }

        },
        // popup层打开分享组件
        popup: function (ele) {
            if (!this.usePopup) {
                return;
            }

            sfclickDom = ele;
            var that = this;
            var $el = $(this.element);
            this.sharePopup = new PopupFrame($el, {
                content: this.listHTML + '<div class="b-share-cancel-btn">取消</div>',
                fullView: false,
                onClose: function () {
                    that.trigger('close');
                }
            });
        },
        // 关闭已经打开的popup分享面板
        close: function () {
            if (!this.usePopup) {
                return;
            }

            this.sharePopup && this.sharePopup.closePopup();
        },
        // 解决qq浏览器分享接口在iframe下不兼容问题
        qqShare: qqShare
    });

    /**
             * 以下为分享截图功能升级
             * fengchuantao
             */

    /**
             * 截图分享功能
             * @param {string} options 传入截图配置
             * @param {Function} callback 回调函数
             */
    function screenshotShare(options, callback) {
        var modelHtml = '';
        // 判断是否为情景页
        if (window.location.pathname === '/sf') {
            modelHtml = screenshotShare.getSfDom(options);
        }
        else { // 结果页打开
            modelHtml = screenshotShare.getSigamDom(options);
        }
        screenshotShare.createRequest(modelHtml, options, callback);
    }

    // 挂载一个全局图片 同一个页面在如果在不关闭面板情况下多次分享不应该调用服务请求
    screenshotShare.imageUrl = '';
    // 防止请求过程中多次点击
    screenshotShare.btnLock = false;

    // 截图获取sigam dom
    screenshotShare.getSigamDom = function (options) {
        // 获取带有除去其它卡片的样式
        var styleHtml = '';
        $('style').not(function (index, element) {
            var p = $(this).parents('div[id="results"]');
            return p.length !== 0;
        }).each(function () {
            styleHtml += $(this).get(0).outerHTML;
        });

        // 获得当前截图卡片的dom
        var modelDom = $('.c-result[tpl=' + options.screenshotCard + ']');

        // 过滤点后推
        var clickRe = modelDom.find('.c-recomm-wrap');
        if (clickRe.length > 0) {
            clickRe.remove();
        }

        // 去除分享按钮
        var shareBotton = options.shareBotton;
        var bottonDom = shareBotton ? modelDom.find('.' + shareBotton) : [];
        if (bottonDom.length > 0) {
            bottonDom.remove();
        }

        // 获取模版的html，并且处理post提交单引号转义的问题
        var modelHtml = (styleHtml + (modelDom.get(0).outerHTML)).replace(/'/g, '27%');
        if ($('.b-share-popup-wrapper').length > 0) {
            modelHtml = modelHtml.replace($('.b-share-popup-wrapper').get(0).outerHTML, '');
        }

        return modelHtml;
    };

    // 截图获取情景页dom
    screenshotShare.getSfDom = function (options) {
        // 存储sf页面dom
        var sfDomWrap = document.createElement('div');

        var $asynSf = $(sfclickDom).closest('.sfa-view');
        var sfHtml = $asynSf.get(0).outerHTML;

        sfDomWrap.innerHTML = sfHtml;
        sfDomWrap.style.minHeight = 0;

        // 去除页面顶部头部固定不兼容样式
        var sfaHead = sfDomWrap.querySelector('.sfa-head');
        var sfaBody = sfDomWrap.querySelector('.sfa-body');
        var sfaResults = sfDomWrap.querySelector('.sfa-top-results');
        var topNavres = sfaResults && sfaResults.querySelector('div[data-tpl =\'top_nav\']');
        var bShareDom = sfDomWrap.querySelector('b-share');

        if (sfaHead) {
            sfaHead.style.position = 'relative';
            var sfaBack = sfaHead.querySelector('.sfa-back');
            var sfaTool = sfaHead.querySelector('.sfa-tool');
            sfaBack && sfaHead.removeChild(sfaBack);
            sfaTool && sfaHead.removeChild(sfaTool);
        }

        if (sfaBody) {
            sfaBody.style.paddingTop = '0';
        }

        if (topNavres) {
            topNavres.style.position = 'relative';
            topNavres.style.top = '0';
        }

        // 如果存在选择截屏
        if (options.templateLen) {
            var len = Number(options.templateLen) - 1;
            var resultAll = $(sfDomWrap).find('.c-result');
            resultAll.map(function (i, ele) {
                if (i > len) {
                    $(ele).remove();
                }

            });
        }

        // 去除分享样式
        $(bShareDom).remove();

        // 获取页面样式
        var styleHtml = '';
        $('head').find('style').each(function () {
            styleHtml += $(this).get(0).outerHTML;
        });

        // 返回拼接后的dom+style
        // 强制覆盖sf背景色
        var bodyColor = '<style>body{background:#333237 !important;}</style>';

        return styleHtml + sfDomWrap.innerHTML + bodyColor;
    };

    // 截图功能创建请求
    screenshotShare.createRequest = function (modelHtml, options, callback) {

        /* 分享页面页面版式 */
        if (options.templateMode === 'noseacherbar') {
            options.templateMode = 'qingjingye';
            options.searchBar = 1;
        }
        else {
            options.searchBar = 0;
        }

            /* eslint-disable */
        // 配置截图请求数据
        var sendData = {
            word: options.word,
            template_mode: options.templateMode,
            render_dom: modelHtml,
            resource_id: options.resourceId,
            target_url: options.linkUrl,
            expression: options.expression,
            no_search_bar: options.searchBar
        };
        /* eslint-enable */
        $.ajax({
            url: 'https://sp2.baidu.com/-bkZdDe71MgUo2bgoI7O1ygwehsv/goshare/pageshot/official',
            type: 'post',
            data: sendData,
            timeout: 6000,
            beforeSend: function () {
                // 创建加载loadding
                screenshotShare.insert();
                screenshotShare.tip('loadding');
            },
            success: function (redata) {
                screenshotShare.tip('ok');
                var jsonData = JSON.parse(redata);
                screenshotShare.imageUrl = jsonData.data.url;
                callback(jsonData.data.url);
            },
            error: function (data) {
                screenshotShare.btnLock = false;
                screenshotShare.tip('error', 3);
            }
        });
    };

    // 请求loding打开关闭 && 错误提示
    screenshotShare.tip = function (type, time) {
        if (type === 'loadding') {
            $('.b-share-loading-toast').show();
        }
        else if (type === 'ok') {
            $('.b-share-loading-toast').hide();
        }
        else {
            $('.b-share-loading-toast').hide();
            $('.b-share-fail-toast').show();
            var timeNum = Number(time) * 1000;
            var clearTime = setTimeout(function () {
                $('.b-share-fail-toast').hide();
            }, timeNum);
        }
    };

    // 插入loading
    screenshotShare.insert = function () {

        /*判断页面中是否存在提交dom*/
        if ($('.b-share-screenshot-wrapper').length === 1) {
            return;
        }

        var sharePopupModel = $('.b-share-popup-modal');
        var tipText = '<div class="b-share-loading-toast b-share-toastbox">正在加载</div>'
            + '<div class="b-share-fail-toast b-share-toastbox">分享失败</div>';
        sharePopupModel.append(tipText);
    };

    // 关闭分享窗口出去截图插入的dom 清除相关数据
    screenshotShare.clearData = function () {
        $('.b-share-loading-toast').remove();
        $('.b-share-fail-toast').remove();
        screenshotShare.imageUrl = '';
    };

    return BShare;
});
