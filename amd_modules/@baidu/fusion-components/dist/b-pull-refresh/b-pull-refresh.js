/**
 * @file b-pull-refresh
 * @author yaochang@baidu.com
 */

define(function (require) {

    var register = require('../deps/fusion.best');

    var BPullRefresh = register('b-pull-refresh', {
        tpl: "<div class=\"b-pull-refresh-head\">\n    <div class=\"b-pull-refresh-loading\">\n        <i class=\"b-pull-refresh-pulling-icon\"></i><i class=\"b-pull-refresh-loading-icon\"></i><span class=\"b-pull-refresh-loading-text c-gap-left-small\">下拉刷新</span>\n    </div>\n    <div class=\"b-pull-refresh-loaded\">\n        <i class=\"c-icon\">&#xe751</i><span class=\"b-pull-refresh-loaded-text c-gap-left-small\">为你推荐50条更新</span>\n    </div>\n</div>\n<div class=\"b-pull-refresh-content\">\n    ${list|raw}\n</div>\n",
        css: ".b-pull-refresh-head {  display: none;  -webkit-transform: translateY(-34px);  transform: translateY(-34px);  text-align: center;}.b-pull-refresh-loading {  height: 34px;}.b-pull-refresh-pulling-icon {  display: inline-block;  margin: 7px 0;  width: 22px;  height: 22px;  background-image: url(//bos.nj.bpc.baidu.com/mms-res/fusion/b-pull-refresh/icon_pulling.png);  background-size: 22px 572px;  background-position: 0 0;  vertical-align: middle;}.b-pull-refresh-loading-icon {  display: none;  margin: 8px 0;  width: 18px;  height: 18px;  border-radius: 50%;  vertical-align: middle;  background-color: #2a2a31;  opacity: .3;  -webkit-animation: b-pull-refresh-loading-icon-animation 750ms;  animation: b-pull-refresh-loading-icon-animation 750ms;  -webkit-animation-timing-function: linear;  animation-timing-function: linear;  -webkit-animation-iteration-count: infinite;  animation-iteration-count: infinite;}.b-pull-refresh-loading-text {  display: inline-block;  font-size: 12px;  line-height: 1;  color: #c6c6c6;  margin-top: 11px;  margin-bottom: 11px;}@-webkit-keyframes b-pull-refresh-loading-icon-animation {  from {    opacity: .3;    -webkit-transform: rotateY(0deg);    transform: rotateY(0deg);  }  40% {    -webkit-transform: rotateY(90deg);    transform: rotateY(90deg);  }  50% {    opacity: .6;    -webkit-transform: rotateY(180deg);    transform: rotateY(180deg);  }  60% {    -webkit-transform: rotateY(270deg);    transform: rotateY(270deg);  }  to {    opacity: .3;    -webkit-transform: rotateY(360deg);    transform: rotateY(360deg);  }}@keyframes b-pull-refresh-loading-icon-animation {  from {    opacity: .3;    -webkit-transform: rotateY(0deg);    transform: rotateY(0deg);  }  40% {    -webkit-transform: rotateY(90deg);    transform: rotateY(90deg);  }  50% {    opacity: .6;    -webkit-transform: rotateY(180deg);    transform: rotateY(180deg);  }  60% {    -webkit-transform: rotateY(270deg);    transform: rotateY(270deg);  }  to {    opacity: .3;    -webkit-transform: rotateY(360deg);    transform: rotateY(360deg);  }}.b-pull-refresh-loaded {  display: none;  height: 28px;  margin: 3px auto;  background-color: #f8f8f8;  color: #000;  padding: 0 15px;  border-radius: 14px;  -webkit-transform: translateY(31px);  transform: translateY(31px);}.b-pull-refresh-loaded i.c-icon {  display: inline-block;  font-size: 14px;  line-height: 14px;  margin: 7px 0;  vertical-align: middle;}.b-pull-refresh-loaded .b-pull-refresh-loaded-text {  display: inline-block;  font-size: 12px;  line-height: 1;  margin-top: 8px;  margin-bottom: 8px;}.b-pull-refresh-inline {  display: inline-block;}",
        props: {
            list: {
                type: String,
                value: '',
                onChange: function () {
                    this.render();
                }
            },
            requestOptions: {
                type: Object,
                value: {}
            },
            showCompleteStatus: {
                type: Boolean,
                value: true
            }
        },
        // 是否正在加载中
        loading: false,

        /**
         * 新数据请求回来以后触发
         *
         * @private
         * @param {number} status 请求返回的状态
         * @param {Object} data 请求返回的数据
         * @param {string} info 请求返回的信息说明
         */
        onDataReceived: function (status, data, info) {
            this.trigger('dataReceived', {
                status: status,
                data: data,
                info: info
            });
        },

        /**
         * 请求出错触发
         *
         * @param {string} err 错误信息
         */
        onError: function (err) {
            this.trigger('error', {
                error: err
            });
        },

        /**
         * 发送请求，使用者需重写这个方法，返回 promise
         *
         * @private
         * @param {Object} options 同 zepto ajax 参数
         * @param {string} options.type get or post
         * @param {string} options.url url
         * @param {Object|string} options.data data
         * @param {string} options.dataType response type to expect from server, always be 'json'
         * @param {number} options.timeout request timeout in milliseconds, default 5000ms
         */
        request: function (options) {
            options.dataType = 'json';
            options.timeout = options.timeout || 5000;
            return $.ajax(options);
        },

        /**
         * 设置 dom 纵向偏移
         *
         * @private
         * @param {Object} $dom dom的 zepto 封装对象
         * @param {number} value 偏移距离，不带单位
         */
        translateY: function ($dom, value) {
            $dom.css({
                '-webkit-transform': 'translateY(' + value + 'px)',
                'transform': 'translateY(' + value + 'px)'
            });
        },

        /**
         * 设置 dom 纵向偏移（带过渡动画）
         *
         * @private
         * @param {Object} $dom dom的 zepto 封装对象
         * @param {number} value 偏移距离，不带单位
         * @param {number} duration 动画时长
         * @param {string} easing timing function
         */
        translateToY: function ($dom, value, duration, easing) {
            $dom.animate({
                '-webkit-transform': 'translateY(' + value + 'px)',
                'transform': 'translateY(' + value + 'px)'
            }, duration, easing);
        },

        /**
         * touchstart callback
         *
         * @private
         * @param {Object} e event
         */
        touchstartHandler: function (e) {
            if (this.loading) {
                return;
            }

            this.originY = e.touches[0].clientY;
            this.scrollTopStart = this.$window.scrollTop();
            // console.log('scrolltop start', this.scrollTopStart);

            this.$head.show();
            this.translateY(this.$content, -this.BASE_HEIGHT);
        },

        /**
         * touchmove callback
         *
         * @private
         * @param {Object} e event
         */
        touchmoveHandler: function (e) {
            if (this.loading) {
                return;
            }

            this.curY = e.touches[0].clientY;
            this.moveY = this.curY - this.originY;
            this.direction = this.moveY > 0 ? 'down' : 'up';

            var curScrollTop = this.scrollTopStart - this.moveY;

            if (this.direction === 'down'
                && curScrollTop <= 0
                && !this.scrollTopStart
            ) {
                e.preventDefault();

                this.moveY -= this.scrollTopStart;
                this.domMoveY = Math.round(this.moveY / 2);
                this.triggerFlag = this.domMoveY >= this.BASE_HEIGHT;
                this.offsetY = this.domMoveY - this.BASE_HEIGHT;

                // 页面跟随手指向下移动
                this.translateY(this.$head, this.offsetY);
                this.translateY(this.$content, this.offsetY);

                // 跟随动画
                var positionY = 0;
                if (this.domMoveY > 19) {
                    positionY = -22 * (this.domMoveY - 20);
                }
                if (this.domMoveY > 45) {
                    positionY = -22 * 25;
                }
                this.$icon.css('background-position-y', positionY + 'px');
            }
        },

        /**
         * 设置 dom 移动到置顶位置的过渡动画
         *
         * @private
         * @param {number} targetY target y position
         */
        backToPosition: function (targetY) {
            this.translateToY(this.$head, targetY, 300, 'ease-out');
            this.translateToY(this.$content, targetY, 300, 'ease-out');
        },

        reset: function () {
            this.$icon.css('background-position-y', '0px');
            this.$icon.show();
            this.$loadingIcon.removeClass(this.CLASS_INLINE);
            this.$loading.show();
            this.$loaded.removeClass(this.CLASS_INLINE);
            this.translateY(this.$loaded, 31);
            this.backToPosition(-this.BASE_HEIGHT);

            this.loading = false;
        },

        /**
         * touchend callback
         *
         * @private
         * @param {Object} e event
         */
        touchendHandler: function (e) {
            if (this.loading) {
                return;
            }

            var self = this;

            if (!self.triggerFlag) {
                self.reset();
                return;
            }

            // 如果元素移动距离超过 loading 部分高度，则在手指松开以后需要触发加载，并且元素需要回归到以0为基准的位置
            self.loading = true;

            self.backToPosition(0);
            self.$icon.hide();
            self.$loadingIcon.addClass(self.CLASS_INLINE);

            var requestOptions = self.getProp('requestOptions');

            var promise = self.request(requestOptions);
            promise.done(function (data, status, xhr) {
                self.onDataReceived(status, data);
                if (data.size) {
                    self.$loadedText.text('为你推荐' + data.size + '条更新');
                }
                else {
                    self.$loadedText.text('暂时没有更新，休息一下吧');
                }
            }).fail(function (xhr, errorType, error) {
                self.onError(errorType, error);
                self.$loadedText.text('暂时没有更新，休息一下吧');
            }).always(function () {
                self.$loading.hide();
                self.$loaded.addClass(self.CLASS_INLINE);
                self.translateToY(self.$loaded, 0, 280, 'ease-out');

                setTimeout(function () {
                    self.reset();
                }, 1280);
            });
        },

        /**
         * init
         *
         * @public
         */
        init: function () {
            var self = this;

            self.CLASS_INLINE = 'b-pull-refresh-inline';
            self.BASE_HEIGHT = 34;
            self.PULLING_ICON_HEIGHT = 22;
            self.$window = $(window);
            self.$head = self.$('.b-pull-refresh-head');
            self.$content = self.$('.b-pull-refresh-content');
            self.$icon = self.$head.find('.b-pull-refresh-pulling-icon');
            self.$loadingIcon = self.$head.find('.b-pull-refresh-loading-icon');
            self.$loading = self.$('.b-pull-refresh-loading');
            self.$loaded = self.$('.b-pull-refresh-loaded');
            self.$loadedText = self.$('.b-pull-refresh-loaded-text');

            var $content = self.$content;

            $content.on('touchstart', self.touchstartHandler.bind(self));
            $content.on('touchmove', self.touchmoveHandler.bind(self));
            $content.on('touchend', self.touchendHandler.bind(self));
        }
    });

    return BPullRefresh;
});
