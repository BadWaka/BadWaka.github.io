/**
 * @author zhulei05
 * @date 2016-10-19
 */

define(function (require) {
    
    var register = require('../deps/fusion.best');
    var Naboo = require('../deps/naboo');
    var Spark = require('../deps/spark');
    
    var BDialog = register('b-dialog', {
        css: "b-dialog {  display: none;}/* 父容器 mask */#b-dialog {  position: relative;  z-index: 1000;}/* mask层 */.b-dialog-mask {  position: fixed;  top: 0;  left: 0;  width: 100%;  height: 100%;  background: rgba(0, 0, 0, 0.4);}/* 对话框layout */.b-dialog-layout {  position: fixed;  left: 50%;  top: 50%;  width: 80%;  margin-left: -40%;  background: #e8e8e8;  border-radius: 6px;  /* 按钮水平布局 */  /* 按钮垂直布局 */  /* 解决事件代理响应区域变为父元素的bug */}.b-dialog-layout .b-dialog-content {  padding: 15px 15px 12px;  font-size: 14px;  line-height: 22px;}.b-dialog-layout .b-dialog-title {  font-size: 18px;  line-height: 26px;  text-align: center;}.b-dialog-layout .b-dialog-text {  margin-top: 4px;}.b-dialog-layout div.b-dialog-buttons {  color: #09f;  text-align: center;  line-height: 40px;  border-top: 1px solid #d9d9d9;}.b-dialog-layout div.c-flexbox span.b-dialog-button {  display: block;  min-width: 35px;  -webkit-box-flex: 1;  -webkit-flex: 1 1 auto;  border-left: 1px solid #d9d9d9;}.b-dialog-layout div.c-flexbox span.b-dialog-button:first-child {  border-left: 0 none;}.b-dialog-layout div.b-dialog-vertical-buttons span.b-dialog-button {  display: block;  border-top: 1px solid #d9d9d9;}.b-dialog-layout div.b-dialog-vertical-buttons span.b-dialog-button:first-child {  border-top: 0 none;}.b-dialog-layout div.b-dialog-buttons:focus {  outline: none;}",
        tpl: "<div id=\"b-dialog\">\n    <div class=\"b-dialog-mask\"></div>\n    <div class=\"b-dialog-layout\">\n        <div class=\"b-dialog-content\">\n            <div class=\"b-dialog-title\">${title}</div>\n            <% if: ${text} %>\n            <div class=\"b-dialog-text\">${text|raw}</div>\n            <% /if %>\n        </div>\n        <div class=\"b-dialog-buttons <% if: ${isBtnVertical} %>b-dialog-vertical-buttons<% else %>c-flexbox<% /if %>\">\n        <% for: ${btns} as ${btn} %>\n            <% if: ${btn.text} %>\n            <span class=\"b-dialog-button c-line-clamp1\">${btn.text}</span>\n            <% /if %>\n        <% /for %>\n        </div>\n    </div>\n</div>\n",
        props: {
            title: {
                type: String,
                value: '',
                onChange: function () {
                    this.render();
                }
            },
            text: {
                type: String,
                value: '',
                onChange: function () {
                    this.render();
                }
            },
            duration: {
                type: Number,
                value: 200
            },
            isBtnVertical: {
                type: Boolean,
                value: false,
                onChange: function () {
                    this.render();
                }
            },
            btns: {
                type: Array,
                value: [],
                onChange: function () {
                    this.render();
                }
            }
        },
        init: function () {
            var _this = this;
            $(this.element).delegate('.b-dialog-button', 'click', function () {
                var index = $(this).index();
                var btns = _this.getProp('btns');
                var close = btns[index].close;
                if (close !== 'false' && close !== false) {
                    _this.close();
                }
                _this.trigger('operate', index);
            });
            
            /**
             * layout部分动画
             *
             * @param  {Function} next 下一步
             * @param  {Element}  dom  dom对象
             * @param  {Object}   obj  动画所需参数
             *         obj.sBefore  scale原始值
             *         obj.sAfter   scale目标值
             *         obj.oBefore  opacity原始值
             *         obj.oAfter   opacity目标值
             *         obj.duration 动画时长
             * 
             */
            Naboo.register('layoutTransform', function (next, dom, obj) {
                $(dom).css({
                    'transform': 'scale(' + obj.sBefore + ')',
                    '-webkit-transform': 'scale(' + obj.sBefore + ')',
                    'opacity': obj.oBefore
                });
                Spark.css3(dom, {'transform': 'scale(' + obj.sAfter + ')', '-webkit-transform': 'scale(' + obj.sAfter + ')', 'opacity': obj.oAfter}, obj.duration, 'ease', 0, function () {
                    $(dom).css({
                        'transform': 'scale(1)',
                        '-webkit-transform': 'scale(1)',
                    });
                    next();
                });
            });

            /**
             * mask部分动画
             *
             * @param  {Function} next      下一步
             * @param  {Element}  dom       dom对象
             * @param  {Number}   before    opacity原始值
             * @param  {Number}   after     opacity目标值
             * @param  {Number}   duration  动画时长
             * 
             */
            Naboo.register('maskTransform', function (next, dom, before, after, duration) {
                $(dom).css({
                    opacity: before
                });
                Spark.css3(dom, {opacity: after}, duration, 'ease', 0, function () {
                    next();
                });
            });
        },
        open: function () {
            $(this.element).show();
            var $layout = this.$('.b-dialog-layout');
            $layout.css({
                'margin-top': - ($layout.height() / 2) + 'px'
            });
            var duration = this.getProp('duration');
            Naboo.p(
                Naboo.maskTransform(this.$('.b-dialog-mask').get(0), 0, 1, 200),
                Naboo.layoutTransform(this.$('.b-dialog-layout').get(0), {
                    sBefore: 1.3,
                    sAfter: 1,
                    oBefore: 0,
                    oAfter: 1,
                    duration: duration
                })
            ).start();
        },
        close: function () {
            var _this = this;
            var duration = this.getProp('duration');

            $(this.element).hide();

            /*Naboo.p(
                Naboo.maskTransform(this.$('.b-dialog-mask').get(0), 1, 0, 200),
                Naboo.layoutTransform(this.$('.b-dialog-layout').get(0), {
                    sBefore: 1,
                    sAfter: 0.7,
                    oBefore: 1,
                    oAfter: 0,
                    duration: duration
                })
            ).start(function () {
                $(_this.element).hide();
            });*/
        },
        detached: function () {
            Spark.dispose();
        }
    });

    return BDialog;
});
