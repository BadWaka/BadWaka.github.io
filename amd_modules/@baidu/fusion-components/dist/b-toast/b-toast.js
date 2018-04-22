/**
 * @author zhulei05
 * @date   2016-10-21
 */

define(function (require) {
    
    var register = require('../deps/fusion.best');
    var Naboo = require('../deps/naboo');
    var Spark = require('../deps/spark');

    var BToast = register('b-toast', {
        css: ".b-toast-wrapper {  display: none;  z-index: 900;  position: fixed;  left: 50%;  top: 50%;  background: rgba(0, 0, 0, 0.8);  border-radius: 22px;  color: #fff;  padding: 8px 18px;  line-height: 24px;  font-size: 18px;  max-width: 40%;  text-align: center;}",
        tpl: "<div class=\"b-toast-wrapper\">${msg}</div>\n",
        props: {
            msg: {
                type: String,
                value: '',
                onChange: function () {
                    this.render();
                }
            },
            duration: {
                type: Number,
                value: 2000
            },
            autoClose: {
                type: Boolean,
                value: true,
                onChange: function (old, now) {
                    if (now) {
                        var _this = this;
                        this.dispose();
                        var duration = this.getProp('duration');
                        this._timer = setTimeout(function () {
                            _this.close();
                        }, duration);
                    }
                }
            }
        },
        init: function () {
            Naboo.register('show', function (next, dom) {
                $(dom).css({
                    '-webkit-transform': 'scale(1.5)',
                    'transform': 'scale(1.5)',
                    'opacity': 0
                });
                Spark.css3(dom, {
                    '-webkit-transform': 'scale(1)',
                    'transform': 'scale(1)',
                    'opacity': 1
                }, 200, 'ease', 0, function () {
                    next();
                });
            });
            Naboo.register('hide', function (next, dom) {
                Spark.css3(dom, {
                    '-webkit-transform': 'scale(0.7)',
                    'transform': 'scale(0.7)',
                    'opacity': 0
                }, 200, 'ease', 0, function () {
                    $(dom).css({
                        '-webkit-transform': 'scale(1)',
                        'transform': 'scale(1)'
                    }).hide();
                });
            });
        },
        // 自动关闭定时器
        _timer: null,
        open: function (opt) {
            opt = opt || {};
            var _this = this;
            var msg = opt.msg || this.getProp('msg');
            this.dispose();
            var $wrapper = this.$('.b-toast-wrapper');
            $wrapper.text(msg).show();
            $wrapper.css({
                'margin-top': - ($wrapper.height() / 2) + 'px',
                'margin-left': - ($wrapper.width() / 2) + 'px'
            });
            var autoClose = !!opt.autoClose || this.getProp('autoClose');
            var duration = Number(opt.duration) || this.getProp('duration');
            Naboo.show($wrapper.get(0), duration).start(function () {
                if (autoClose) {
                    _this._timer = setTimeout(function () {
                        _this.close();
                    }, duration);
                }
            });
        },
        close: function () {
            var $wrapper = this.$('.b-toast-wrapper');
            Naboo.hide($wrapper.get(0)).start();
            this.render();
            this.trigger('close');
        },
        dispose: function () {
            this._timer && clearTimeout(this._timer);
        },
        detached: function () {
            this.dispose();
            Spark.dispose();
        }
    });

    return BToast;
});
