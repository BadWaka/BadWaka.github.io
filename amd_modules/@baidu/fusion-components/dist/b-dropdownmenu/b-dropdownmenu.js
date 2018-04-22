/**
 * @file 下拉筛选、排序
 * @author  liuyan29
 * @date 2017-04-05
 */

define(function (require) {
    
    var register = require('../deps/fusion.best');

    var BDropdownMenu = register('b-dropdownmenu', {
        tpl: "<div class=\"b-dropdownmenu-wrapper\">\n    <div class=\"b-dropdownmenu-mask hidden\"></div>\n    <ul class=\"b-dropdownmenu-nav c-row\">\n        <% for: ${list} as ${item}, ${index} %>\n        <li class=\"${item.className} ${item.key}\" data-key=\"${item.key}\" data-name=\"${item.name}\">\n            <span>${item.name}</span>\n            <i class=\"c-icon b-dropdownmenu-nav-icon\">&#xe73c</i>\n        </li>\n        <% /for %>\n    </ul>\n    <div class=\"b-dropdownmenu-menu-wrapper\">\n        <% for: ${list} as ${item}, ${index} %>\n        <ul class=\"b-dropdownmenu-menu hidden ${item.key}\" data-key=\"${item.key}\">\n            <% for: ${item.menu} as ${it}, ${idx} %>\n            <li class=\"c-flexbox\" data-key=\"${it.key}\" data-name=\"${it.name}\" data-disabled=\"${it.disabled}\">\n                <span class=\"c-line-clamp1\">${it.name}</span>\n                <i class=\"c-icon hidden b-dropdownmenu-menu-icon\">&#xe608</i>\n            </li>\n            <% /for %>\n        </ul>\n        <% /for %>\n    </div>\n</div>\n",
        css: ".b-dropdownmenu-wrapper {  position: relative;}.b-dropdownmenu-nav {  position: absolute;  top: 0;  left: 0;  z-index: 999;  margin: 0 auto;  width: 100%;  background-color: #f8f8f8;}.b-dropdownmenu-nav li:not(:last-child)::after {  content: \"\";  width: 1px;  height: .1rem;  position: absolute;  top: 50%;  right: 0;  display: inline-block;  margin-top: -0.05rem;  background-color: #e7e7e7;}.b-dropdownmenu-nav li {  margin: .15rem 0;  list-style: none;  height: 14px;  line-height: 14px;  font-size: 14px;  color: #333;  text-align: center;}.b-dropdownmenu-nav span {  padding: 1px 0;  display: inline-block;  max-width: 67%;  overflow: hidden;  white-space: nowrap;  text-overflow: ellipsis;}.b-dropdownmenu-nav .c-icon {  vertical-align: top;}.b-dropdownmenu-menu-wrapper {  position: absolute;  top: .44rem;  width: 100%;}.b-dropdownmenu-menu li {  padding: .15rem .16rem;  line-height: 14px;  height: 14px;  font-size: 14px;  color: #333;  background-color: #fff;}.b-dropdownmenu-menu li:not(:last-child) {  border-bottom: 1px solid #f1f1f1;}.b-dropdownmenu-nav li.highlight,.b-dropdownmenu-menu li.highlight {  color: #39f;}.b-dropdownmenu-menu li.highlight .b-dropdownmenu-menu-icon {  display: block;}.b-dropdownmenu-menu span {  margin-right: 8px;}.hidden {  display: none;}.show {  display: block;}.b-dropdownmenu-mask {  position: fixed;  top: 0;  left: 0;  width: 100%;  height: 100%;  background: rgba(0, 0, 0, 0.4);}",
        props: {
            list: {
                type: Array,
                value: [],
                onChange: function () {
                    this.render();
                }
            }
        },
        nav: true,
        swap: false,
        init: function () {
            var _this = this;

            _this.bindEvents();
        },
        bindEvents: function () {
            var _this = this;

            $(_this.element).find('.b-dropdownmenu-nav li').on('click', function (e) {
                var target = e.currentTarget,
                    index = $(target).index(),
                    key = $(target).data('key');

                if (_this.index === index) {
                    if(_this.$('.b-dropdownmenu-menu.' + key).hasClass('hidden')) {
                        _this.$('.b-dropdownmenu-menu.' + key).removeClass('hidden');
                        _this.$('.b-dropdownmenu-mask').removeClass('hidden');
                        _this.$(target).addClass('highlight');
                        _this.$(target).children('i').html('&#xe736');
                    }else {
                        _this.$('.b-dropdownmenu-menu.' + key).addClass('hidden');
                        _this.$('.b-dropdownmenu-mask').addClass('hidden');
                        _this.$('.b-dropdownmenu-nav').children('li').removeClass('highlight');
                        _this.$('.b-dropdownmenu-nav li').children('i').html('&#xe73c');
                    }
                    return;
                }

                _this.index = index;
                _this.$('.b-dropdownmenu-mask').removeClass('hidden');
                _this.$('.b-dropdownmenu-menu').addClass('hidden');
                _this.$('.b-dropdownmenu-menu.' + key).removeClass('hidden');
                _this.$('.b-dropdownmenu-nav').children('li').removeClass('highlight');
                _this.$(target).addClass('highlight');
                _this.$('.b-dropdownmenu-nav li').children('i').html('&#xe73c');
                _this.$(target).children('i').html('&#xe736');

                if(_this.nav === true || _this[key] !== true) {
                    _this.swap = true;
                    $('.b-dropdownmenu-menu.'+key+' li').eq(0).trigger('click');
                }
            });

            $(_this.element).find('.b-dropdownmenu-menu li').on('click', function (e) {
                var target = e.currentTarget,
                    parentKey = $(target).parent().data('key'),
                    key = $(target).data('key'),
                    parentName = $('.b-dropdownmenu-nav li.'+parentKey).data('name'),
                    name = $(target).data('name'),
                    disabled = $(target).data('disabled');

                _this[parentKey] = true;

                if(_this.nav === false && _this.swap === false) {
                    _this.$('.b-dropdownmenu-menu').addClass('hidden');
                    _this.$('.b-dropdownmenu-mask').addClass('hidden');
                    _this.$('.b-dropdownmenu-nav li').children('i').html('&#xe73c');
                    // _this.$(target).parent().children().removeClass('highlight');
                    _this.$('.b-dropdownmenu-nav .'+parentKey).removeClass('highlight');
                    if(disabled === true) {
                        name = parentName;
                    }
                    _this.$('.b-dropdownmenu-nav .'+parentKey).children('span').html(name);
                    _this.trigger('selected', {
                        parentKey: parentKey,
                        key: key
                    });
                }
                _this.nav = false;
                _this.swap = false;
                _this.$('.b-dropdownmenu-menu.'+parentKey).children().removeClass('highlight');
                _this.$(target).addClass('highlight');
            });

            $(_this.element).find('.b-dropdownmenu-mask').on('click', function (e) {
                _this.$('.b-dropdownmenu-mask').addClass('hidden');
                _this.$('.b-dropdownmenu-menu').addClass('hidden');
                _this.$('.b-dropdownmenu-nav li').removeClass('highlight');
                _this.$('.b-dropdownmenu-nav li').children('i').html('&#xe73c');
            });
        }
    });

    return BDropdownMenu;
});
