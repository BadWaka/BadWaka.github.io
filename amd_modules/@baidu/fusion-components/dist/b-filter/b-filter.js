/**
 * @author zhulei05
 * @date 2016-10-26
 */

define(function (require) {
    
    var register = require('../deps/fusion.best');
    var Naboo = require('../deps/naboo');
    var Spark = require('../deps/spark');

    var BFilter = register('b-filter', {
        css: "/** * @file 筛选浮层样式 * @author zhulei05 * @description 通过fis的__inline编译到js中 *//*最外层wrapper*/.b-filter-wrapper {  z-index: 900;}/*遮罩*/.b-filter-mask {  display: none;  position: fixed;  left: 0;  top: 0;  opacity: 0;  width: 100%;  height: 100%;  background: rgba(0, 0, 0, 0.5);  z-index: 901;}/*head和content的外层容器*/.b-filter-modal {  display: none;  position: fixed;  left: 0;  bottom: 0;  width: 100%;  background-color: #fff;  z-index: 902;  margin: 0;  overflow: hidden;  -webkit-transform: translate3d(0, 100%, 0);  transform: translate3d(0, 100%, 0);}/*内容*/.b-filter-content {  margin: 0;  text-align: left;}.b-filter-header,.b-filter-list > li {  padding-left: 21px;  padding-right: 21px;}.b-filter-header {  background-color: #f0f0f0;  height: 42px;  line-height: 42px;  overflow: hidden;}.b-filter-title {  font-size: 18px;  text-align: center;}.b-filter-list {  max-height: 171px;  overflow-y: scroll;  -webkit-overflow-scrolling: touch;}.b-filter-list > li {  border-bottom: 1px solid  #ebebeb;  height: 42px;  line-height: 42px;}.b-filter-list > li:last-child {  border-bottom: none;}.b-filter-inner {  position: relative;}.b-filter-item .c-line-clamp1 {  margin-right: 30px;}.b-filter-item .c-icon:after {  content: \"\\e608\";  display: none;  position: absolute;  right: 0;  text-align: right;  top: 0;  width: 30px;}.b-filter-list-radio .b-filter-selected .c-icon:after,.b-filter-list-multiple .b-filter-selected .c-icon:after {  display: block;}.b-filter-list-multiple .c-icon {  border: 1px solid  #ddd;  height: 16px;  margin-top: 12px;  overflow: hidden;  position: absolute;  right: 0;  top: 0;  width: 16px;}.b-filter-list-multiple .c-icon:after {  color: #3fa1ff;  font-size: 10px;  height: 16px;  line-height: 16px;  right: 0;  text-align: center;  top: 0;  width: 16px;}.b-filter-title-multiple {  -webkit-box-flex: 1;  -webkit-flex: 1 1 auto;}.b-filter-header-all,.b-filter-header-done {  -webkit-box-flex: 0;  -webkit-flex: none;}",
        tpl: "<div class=\"b-filter-wrapper\">\n    <div class=\"b-filter-modal\">\n        <div class=\"b-filter-content\">\n        <% if: ${multiple} %>\n            <div class=\"b-filter-header c-flexbox\">\n                <div class=\"b-filter-header-all\">全部</div>\n                <div class=\"b-filter-title b-filter-title-multiple c-line-clamp1\">${title}</div>\n                <div class=\"b-filter-header-done\">完成</div>\n            </div>\n            <ul class=\"b-filter-list b-filter-list-multiple\">\n            <% for: ${data} as ${item} %>\n                <li class=\"b-filter-item<% if: (${item.selected} === true || ${item.selected} === 'true')%> b-filter-selected<% /if %>\" data-val=\"${item.value}\">\n                    <div class=\"b-filter-inner\">\n                        <p class=\"c-line-clamp1\">${item.text}</p>\n                        <i class=\"c-icon\"></i>\n                    </div>\n                </li>\n            <% /for %>\n            </ul>\n        <% else %>\n            <div class=\"b-filter-header\">\n                <div class=\"b-filter-title c-line-clamp1\">${title}</div>\n            </div>\n            <ul class=\"b-filter-list b-filter-list-radio\">\n            <% for: ${data} as ${item} %>\n                <li class=\"b-filter-item<% if: (${item.selected} === true || ${item.selected} === 'true')%> b-filter-selected<% /if %>\" data-val=\"${item.value}\">\n                    <div class=\"b-filter-inner\">\n                        <p class=\"c-line-clamp1\">${item.text}</p>\n                        <i class=\"c-icon\"></i>\n                    </div>\n                </li>\n            <% /for %>\n            </ul>\n        <% /if %>\n        </div>\n    </div>\n    <div class=\"b-filter-mask\"></div>\n</div>\n",
        props: {
            multiple: {
                type: Boolean,
                value: false
            },
            title: {
                type: String,
                value: ''
            },
            data: {
                type: Array,
                value: []
            }
        },
        popup: null,
        old: null,
        oldValue: null,
        init: function () {
            Naboo.register('fade', function (next, dom, duration, opacity) {
                Spark.css3(dom, {opacity: opacity}, duration, 'ease', 0, function () {
                    next();
                });
            });
            Naboo.register('slide', function (next, dom, duration, y) {
                var transform = 'translate3d(0, ' + y + ', 0)';
                var property = {
                    'transform': transform,
                    '-webkit-transform': transform
                };
                Spark.css3(dom, property, duration, 'ease', 0, function () {
                    $(dom).css({
                        'transform': 'none',
                        '-webkit-transform': 'none'
                    });
                    next();
                });
            });

            var _this = this;

            _this.$('.b-filter-wrapper').on('click', '.b-filter-mask', function () {
                _this.close();
            }).on('touchmove', '.b-filter-list', function (e) {
                e.stopPropagation();
            });

            _this.$('.b-filter-mask').on('click', function () {
                _this.trigger('cancel', {
                    type: 'b-filter',
                    action: 4
                });
            });

            var obj = _this.getProp();

            var old = _this.$('.b-filter-selected').map(function () {
                return $(this).index();
            }).get();

            var oldValue = old.map(function (index) {
                return (obj.data[index] || '').value;
            });

            if (obj.multiple) {
                _this.old = old;

                _this.oldValue = oldValue;

                if (_this.$('.b-filter-selected').length === obj.data.length) {
                    _this.$('.b-filter-header-all').addClass('c-color-gray');
                }

                _this.$('.b-filter-item').on('click', function () {
                    var isAll;
                    $(this).toggleClass('b-filter-selected');
                    isAll = _this.$('.b-filter-selected').length === obj.data.length;
                    _this.$('.b-filter-header-all')[isAll ? 'addClass' : 'removeClass']('c-color-gray');
                    _this.trigger('clickItem', {
                        type: 'b-filter',
                        action: 3,
                        extra: String($(this).find('.c-line-clamp1').text()).substr(0, 10)
                    });
                });

                _this.$('.b-filter-header-all').on('click', function () {
                    // 如果是灰的表示禁用
                    if ($(this).hasClass('c-color-gray')) {
                        return false;
                    }

                    $(this).addClass('c-color-gray');

                    _this.$('.b-filter-item').addClass('b-filter-selected');

                    _this.trigger('clickAll', {
                        type: 'b-filter',
                        action: 1
                    });
                });

                _this.$('.b-filter-header-done').on('click', function () {
                    var index = _this.$('.b-filter-selected').map(function () {
                        return $(this).index();
                    }).get();
                    var value = index.map(function (i) {
                        return (obj.data[i] || '').value;
                    });

                    _this.trigger('select', {
                        index: index,
                        value: value,
                        old: _this.old,
                        oldValue: _this.oldValue,
                        event: String(index) === String(_this.old) ? 'none' : 'change'
                    });

                    _this.trigger('clickDone', {
                        type: 'b-filter',
                        action: 2
                    });

                    _this.old = index;
                    _this.oldValue = value;

                    _this.close();
                });
            }
            else {
                _this.old = old[0];
                _this.oldValue = oldValue[0];

                _this.$('.b-filter-item').on('click', function () {
                    var index = $(this).index();
                    var value = (obj.data[index] || '').value;

                    _this.$('.b-filter-item').removeClass('b-filter-selected');
                    $(this).addClass('b-filter-selected');

                    _this.trigger('select', {
                        index: index,
                        value: value,
                        old: _this.old,
                        oldValue: _this.oldValue,
                        event: String(index) === String(_this.old) ? 'none' : 'change'
                    });

                    _this.trigger('clickItem', {
                        type: 'b-filter',
                        action: 3,
                        extra: String($(this).find('.c-line-clamp1').text()).substr(0, 10)
                    });

                    _this.old = index;
                    _this.oldValue = value;

                    _this.close();
                });
            }
        },
        open: function () {
            var _this = this;
            
            var $mask = this.$('.b-filter-mask');
            var $modal = this.$('.b-filter-modal');

            $mask.show();
            $modal.css({
                'transform': 'translate3d(0, 100%, 0)',
                '-webkit-transform': 'translate3d(0, 100%, 0)'
            }).show();
            var duration = 400;
            Naboo.p(Naboo.fade($mask.get(0), duration, 1), Naboo.slide($modal.get(0), duration, '0')).start();
        },
        close: function () {
            var _this = this;
            var $mask = this.$('.b-filter-mask');
            var $modal = this.$('.b-filter-modal');
            var duration = 400;
            Naboo.p(Naboo.fade($mask.get(0), duration, 0), Naboo.slide($modal.get(0), duration, '100%')).start(function () {
                $mask.hide();
                $modal.hide();
            });
        },
        dispose: function () {
            Spark.dispose();
        }
    });

    return BFilter;
});
