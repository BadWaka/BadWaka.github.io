/**
 * @file b-grouplsit
 * @author  guoyong03
 * @date 2017-03-08
 */
define(function (require) {
    
    var register = require('../deps/fusion.best');

    var BGroupList = register('b-grouplist', {
        css: "/** * @file 分组样式 * @author guoyong03 *//*最外层wrapper*/.b-grouplist-wrapper {  position: relative;}.b-grouplist-group {  list-style: none;  color: #999;  line-height: 37px;  border-top: 1px solid #f1f1f1;}.b-grouplist-item {  list-style: none;  color: #333;  line-height: 37px;  border-top: 1px solid #f1f1f1;  position: relative;}.b-grouplist-item.disbale {  color: #ccc;}.b-grouplist-item:first-child {  border-top: 0;}.b-grouplist-item .c-icon:after {  content: \"\\e608\";  display: none;  position: absolute;  right: 0;  text-align: right;  top: 0;  width: 30px;}.b-grouplist-item .c-icon:after {  content: \"\\e608\";  display: none;  position: absolute;  right: 0;  text-align: right;  top: 0;  width: 30px;}.b-grouplist-selected {  color: #38f;}.b-grouplist-selected .c-icon:after {  display: block;}.b-grouplist-sidebar {  position: fixed;  right: 7px;  top: 46px;  width: 38px;  color: #666;  text-align: center;  z-index: 50;}.b-grouplist-link {  font-size: 10px;  line-height: 18px;}.b-grouplist-large-char {  display: none;  position: fixed;  left: 50%;  top: 50%;  width: 78px;  height: 78px;  line-height: 78px;  margin-left: -39px;  margin-top: -39px;  border-radius: 3px;  font-size: 36px;  color: #fff;  text-align: center;  background: rgba(51, 51, 51, 0.4);}",
        tpl: "<div class=\"b-grouplist-wrapper\">\r\n    <ul>\r\n        <% if: ${needall} %>\r\n        <li class=\"b-grouplist-item <% if: !${selected} %> b-grouplist-selected<% /if %>\" data-val=\"all\" >全部<i class=\"c-icon\"></i></li>\r\n        <% /if %>\r\n        <% for: ${list} as ${item}, ${index} %>\r\n        <li class=\"b-grouplist-group <% if: ${item.disbale} %> disbale<% /if %>\" <% if: ${item.indexCode} %> data-index=\"${item.indexCode}\" <% /if %>>\r\n            <div>${item.text|raw}</div>\r\n            <ul>\r\n            <% for: ${item.items} as ${value}, ${key} %>\r\n                <li class=\"b-grouplist-item <% if: ${value.disbale} || ${item.disbale} %> disbale<% /if %> <% if: ${selected} == ${value.code} %> b-grouplist-selected<% /if %>\" data-val=\"${value.code}\" >${value.text|raw}<i class=\"c-icon\"></i></li>\r\n            <% /for %>\r\n            </ul>\r\n        </li>\r\n        <% /for %>\r\n    </ul>\r\n    <% if: ${needindex} %>\r\n    <div class=\"b-grouplist-sidebar\">\r\n        <% for: ${list} as ${item} %>\r\n        <div class=\"b-grouplist-link\" data-anchor=\"${item.indexCode}\">${item.indexCode}</div>\r\n        <% /for %>\r\n    </div>\r\n    <div class=\"b-grouplist-large-char\"></div>\r\n    <% /if %>\r\n</div>\r\n",
        props: {
            list: {
                type: Array,
                value: [],
                onChange: function () {
                    this.render();
                }
            },
            needall: {
                type: Boolean,
                value: false,
                onChange: function () {
                    this.render();
                }
            },
            needindex: {
                type: Boolean,
                value: false,
                onChange: function () {
                    this.render();
                }
            },
            selected: {
                type: String,
                value: '',
                onChange: function () {
                    this.render();
                }
            }
        },

        init: function () {
            var _this = this;
            setTimeout(function () {
                _this.bindEvents();
            });
        },
        bindEvents: function () {
            var _this = this;
            _this.$('.b-grouplist-item').on('click', function (event) {
                var code = $(this).data('val');
                if (code === '' || $(this).hasClass('disbale') || $(this).hasClass('b-grouplist-selected')) {
                    return;
                }

                var name = $(this).text();
                var info = {
                    name: name,
                    code: code
                };

                _this.$('.b-grouplist-item').removeClass('b-grouplist-selected');
                $(this).addClass('b-grouplist-selected');

                _this.trigger('itemSelected', info);
            });

            this.$('.b-grouplist-sidebar').on('touchmove', function (e) {
                var y = e.touches[0].clientY;
                y -= parseInt($(this).css('top'));
                var $links = $(this).find('.b-grouplist-link');
                var perHei = $links.eq(0).height();
                var index = Math.floor(y / perHei);
                var anchor = $links.eq(index).data('anchor');
                var char = $links.eq(index).text();
                if (anchor) {
                    var $wrapper = _this.$('.b-grouplist-wrapper');
                    var top = _this.$('.b-grouplist-group[data-index="' + anchor + '"]').position().top;
                    $(window).scrollTop($wrapper.scrollTop() + top);
                    _this._showLargeChar(char);
                }
                return false;
            });
        },
        timer: null,
        _showLargeChar: function (char) {
            this.timer && clearTimeout(this.timer);
            var $largeChar = this.$('.b-grouplist-large-char');
            $largeChar.text(char).show();
            this.timer = setTimeout(function () {
                $largeChar.hide();
            }, 1000);
        },
        detached: function () {
        }
    });

    return BGroupList;
});
