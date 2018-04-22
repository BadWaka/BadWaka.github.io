/*
 * Image Lightbox: a fullscreen infinite image slider
 */

define(function (require) {
    
    var register = require('../deps/fusion.best');

    /*
     * The lightbox constructor
     */
    function Lightbox() {}

    Lightbox.prototype = {
        css: "b-lightbox {  display: none;  opacity: 0;  position: fixed;  z-index: 10001;  background-color: #000;  overflow: hidden;  top: 0;  left: 0;  right: 0;  bottom: 0;}b-lightbox .b-lightbox-container,b-lightbox .b-lightbox-item,b-lightbox .b-lightbox-item .b-lightbox-message {  position: absolute;  top: 0;  left: 0;  right: 0;  bottom: 0;}b-lightbox .b-lightbox-container {  transform-origin: top left;}b-lightbox .b-lightbox-item {  background-repeat: no-repeat;  background-position: center;  background-size: contain;}b-lightbox .b-lightbox-item.prev {  left: -100%;  right: 100%;}b-lightbox .b-lightbox-item.next {  left: 100%;  right: -100%;}b-lightbox .b-lightbox-item .b-lightbox-message {  text-align: center;  top: auto;  bottom: 50%;  color: #777;  font-size: 20px;}",
        tpl: "<div class=\"b-lightbox-container\">\n    <div class=\"b-lightbox-item prev\"></div>\n    <div class=\"b-lightbox-item current\"></div>\n    <div class=\"b-lightbox-item next\"></div>\n</div>\n",
        LOADING_HTML: "<p class=\"b-lightbox-message\">正在载入...</p>\n",
        ERROR_HTML: "<p class=\"b-lightbox-message\">载入失败</p>\n",
        NOMORE_HTML: "<p class=\"b-lightbox-message\">没有更多了</p>\n",
        props: {
            images: {
                type: Array,
                value: "[]",
                onChange: function(old,now){
                    this.images = changeObj(now);
                }
            },
            fadeInDuration: {
                type: Number,
                value: 400
            },
            fadeOutDuration: {
                type: Number,
                value: 300
            },
            dockDuration: {
                type: Number,
                value: 300
            }
        },
        created: function() {
            var config = this.getProp();

            this.images = config.images;
            this.images = changeObj(this.images);
            this.queue = $.Deferred().resolve(this.images);
            this.animating = 0;
            this.$element = $(this.element)
                .on('touchend', this.onTouchEnd.bind(this))
                .on('touchmove', this.onTouchMove.bind(this))
                .on('touchstart', this.onTouchBegin.bind(this))
                .on('click', this.hide.bind(this))
                .on('mousewheel', this.onMouseWheel.bind(this));
        },
        detached: function () {
            this.timer && clearTimeout(this.timer);
        },
        getPrevPage: function() {
            return $.Deferred().resolve([]);
        },
        getNextPage: function() {
            return $.Deferred().resolve([]);
        },
        /*
         * Ensure the page at idx exist
         * @param {Number} idx the page index
         */
        ensureIndex: function(idx) {
            if (idx >= this.images.start  && idx <= this.images.end) {
                return $.Deferred().resolve(this.images);
            }else if(idx < this.images.start){
                return this.queue.then(function(images) {
                    // asume one page is enough                    
                    return this.getPrevPage().then(function(imgs) {
                        imgs.reverse().forEach(function(v, i) {
                            images.start--;
                            images[images.start] = v;
                        });
                        return images;
                    });
                }.bind(this));
            }else{
                return this.queue.then(function(images) {
                    return this.getNextPage().then(function(imgs) {
                        imgs.forEach(function(v, i) {
                            images[++images.end] = v;
                        });
                        return images;
                    });
                }.bind(this));
            }
        },
        /*
         * Get the image at idx
         * @param {Number} idx the image index
         */
        getImage: function(idx) {
            return this.ensureIndex(idx).then(function(images) {
                return images[idx];
            });
        },
        onMouseWheel: function() {
            return false;
        },
        onTouchBegin: function(e) {
            // required by Android ICS, to trigger ontouchend
            e.preventDefault();
            if (this.animating) return;

            this.beginX = e.changedTouches[0].pageX;
            this.beginTime = Date.now();
        },
        onTouchMove: function(event) {
            // required by Android ICS, to trigger ontouchend
            event.preventDefault();
            if (this.animating) return;

            this.endX = event.changedTouches[0].pageX;

            var x = this.endX - this.beginX;
            applyTransform(this.$container, 'translate3d(' + x + 'px,0px,0px)');
        },
        onTouchEnd: function(e) {
            if (this.animating) return;

            this.endX = e.changedTouches[0].pageX;
            this.endTime = Date.now();

            if (this.isClick()) this.$element.trigger('click');
                                                          
            var target = this.getSwipeTarget();
            if (this.$element.find(target).data('ready') !== 'yes') {
                target = '.current';
            }

            var x = translateXForSelector(target);
            this.animating++;
            this.$container.animate({
                'transform': 'translate3d(' + x + 'px, 0, 0)',
                '-webkit-transform': 'translate3d(' + x + 'px, 0, 0)'
            }, {
                duration: this.getProp('dockDuration'),
                complete: function() {
                    this.animating--;

                    var $wps = this.$element.find('.b-lightbox-item');
                    var $prev = $wps.filter('.prev');
                    var $curr = $wps.filter('.current');
                    var $next = $wps.filter('.next');
                    if (target === '.prev') {
                        this.idx--;
                        $prev.attr('class', 'b-lightbox-item current');
                        $curr.attr('class', 'b-lightbox-item next');
                        $next.attr('class', 'b-lightbox-item prev');
                        this.setBackground(this.$element.find('.prev'), this.idx - 1);
                        this.trigger('switched', [this.idx, 'left']);
                    } else if (target === '.next') {
                        this.idx++;
                        $next.attr('class', 'b-lightbox-item current');
                        $curr.attr('class', 'b-lightbox-item prev');
                        $prev.attr('class', 'b-lightbox-item next');
                        this.setBackground(this.$element.find('.next'), this.idx + 1);
                        this.trigger('switched', [this.idx, 'right']);
                    }
                    this.$container.css('transform', '').css('-webkit-transform', '');
                }.bind(this)
            });
        },
        /*
         * Is this touch a click?
         * Since ontouchbegin prevented default, we should trigger onclick manually.
         * By inspecting duration and length, 
         * we treat touch events with small deltaT and deltaX as a click event.
         */
        isClick: function() {
            var deltaT = this.endTime - this.beginTime;
            var deltaX = Math.abs(this.endX - this.beginX);
            return deltaT < 700 && deltaX < 7;
        },
        /*
         * Get the swipe target selector
         * Cancel swipe if deltaX is not long enough.
         * But enforce swipe for quick touchmoves.
         */
        getSwipeTarget: function() {
            var deltaX = this.endX - this.beginX;
            var direction = getDirection(deltaX, 0.3 * $(window).width());
            if (direction === 0) {
                var deltaT = Math.max(this.endTime - this.beginTime, 1);
                var v = deltaX / deltaT;
                direction = getDirection(v, 0.3);
            }

            function getDirection(offset, max) {
                if (offset > max) return -1;
                if (offset < -max) return 1;
                return 0;
            }
            return ['.prev', '.current', '.next'][direction + 1];
        },
        /*
         * Hide the lightbox, and destroy the DOM
         */
        hide: function() {
            var $element = this.$element;
            if (!$element || !$element.length) return;
            $element
                .animate({
                    opacity: 0
                }, {
                    duration: this.getProp('fadeOutDuration'),
                    complete: function() {
                        $element.css('display', 'none');
                    }
                });
            $element.find('.lightbox-item').removeAttr('style');
            this.trigger('hidden', [this.idx]);
        },
        /*
         * Show the lightbox, and create corresponding DOM elements
         * @param {Number} idx the index of the image to be opened.
         * @param {jQuery} from the element to animate from, typically an <img> element
         * @param {String} placeholder the url of the image during loading, typically the
         *      src property of an existing <img> element.
         */
        show: function(idx, $from, placeholder) {
            idx = parseInt(idx) || 0;

            var $element = this.$element;
            var $container = this.$container = $element.find('.b-lightbox-container');

            this.idx = idx;

            this.$element.css('display', 'block');
            this.setBackground($element.find('.current'), idx, placeholder);
            this.setBackground($element.find('.next'), idx + 1);
            this.setBackground($element.find('.prev'), idx - 1);

            this.fadeIn();
            this.animateToFullScreen($container, $from);

            this.trigger('shown', [this.idx]);
        },
        animateToFullScreen: function($el, $from) {
            var w2 = $(window).width();
            var h2 = $(window).height();
            var transform = 'scale3d(%c,%c,1) translate3d(%xpx,%ypx,0px)';
            var to = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };

            if($from){
                var from = elementRect($from, w2, h2);
                to = containRect(from.height, from.width, h2, w2);
                transform = transform
                    .replace(/%c/g, from.width / to.width)
                    .replace('%x', from.left - to.left)
                    .replace('%y', from.top - to.top);
                $el
                    .css('top', to.top).css('bottom', to.bottom)
                    .css('left', to.left).css('right', to.right);
            }
            else{
                transform = transform
                    .replace(/%c/g, 0)
                    .replace('%x', 0)
                    .replace('%y', 0);
                $el.css('transform-origin', '50% 50% 0');
            }
            // hide .prev and .next while scaling
            applyTransform($el, transform).css('overflow', 'hidden');

            this.animating++;
            //wait DOM render
            this.timer = setTimeout(function() {
                $el.animate({
                    'transform': 'scale3d(1,1,1) translate3d(0px,0px,0px)',
                    '-webkit-transform': 'scale3d(1,1,1) translate3d(0px,0px,0px)',
                }, {
                    duration: this.getProp('fadeInDuration'),
                    easing: 'ease-in-out',
                    complete: function() {
                        $el.css('overflow', '')
                            .css('top', '').css('left', '')
                            .css('bottom', '').css('right', '')
                            .css('transform-origin', '');
                        this.animating--;
                    }.bind(this)
                });
            }.bind(this));
        },
        fadeIn: function() {
            this.animating++;
            this.$element.animate({
                opacity: 1,
            }, {
                duration: this.getProp('fadeInDuration'),
                easing: 'ease-in',
                complete: function() {
                    this.animating--;
                }.bind(this)
            });
        },
        /*
         * Set the background of the image
         * @param {jQuery} container the container to set background of
         * @param {Number} idx the index of the background image
         * @param {String} placeholder the url of the placeholder image during loading
         */
        setBackground: function($container, idx, placeholder) {
            $container.data('ready', 'no');
            this.getImage(idx).then(function(img) {
                clearBackground($container);

                // no more images
                if (!img) return $container.html(this.NOMORE_HTML);

                // init placeholder info
                if (placeholder) {
                    $container.css('background-image', 'url(' + placeholder + ')');
                } else {
                    $container.append($(this.LOADING_HTML));
                }

                // async loading
                var tmp = new Image();
                tmp.onload = function() {
                    clearBackground($container).css('background-image', 'url(' + img.src + ')');
                };
                tmp.onerror = function() {
                    if (!placeholder) {
                        clearBackground($container).html(this.ERROR_HTML);
                    }
                }.bind(this);
                tmp.src = img.src;

                // enable swipe to
                $container.data('ready', 'yes');
            }.bind(this));
        }
    };

    function clearBackground($el) {
        return $el.empty().css('background-image', '');
    }

    function changeObj(images){
        var tmp = {
            'start':0,
            'end':images.length-1
        };
        images.forEach(function(val, key) {
            tmp[key] = val;
        });
        images = tmp;
        return images;
    }
    /*
     * Apply transform CSS property to the specified element
     * @param {jQuery} container the element to be transformed
     * @param {String} v the transform value
     */
    function applyTransform($container, v) {
        return $container
            .css('transform', v)
            .css('-webkit-transform', v);
    }

    /*
     * Get translateX value for given selector
     * @param {String} sel the selector, available values: .prev, .current, .next
     * @return {Number} the translateX value
     */
    function translateXForSelector(sel) {
        var idx = ['.prev', '.current', '.next'].indexOf(sel);
        return $(window).width() * (1 - idx);
    }

    /*
     * Calc the size of box1 [h1, w1] to be contained within box2 [h2, w2]
     * @return {Object} the size of box1 after resize
     */
    function containRect(h1, w1, h2, w2) {
        var rect = {
            width: w2,
            height: h2,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        if (h2 * w1 > h1 * w2) {
            rect.height = w2 * h1 / w1;
            rect.bottom = rect.top = (h2 - rect.height) / 2;
        } else {
            rect.width = h2 * w1 / h1;
            rect.right = rect.left = (w2 - rect.width) / 2;
        }
        return rect;
    }

    /*
     * Get the rect of element
     */
    function elementRect($el, containerWidth, containerHeight) {
        var rect;
        if ($el && $el.length) {
            rect = $el.get(0).getBoundingClientRect();
        } else {
            rect = {
                width: 1,
                height: 1,
                top: containerHeight / 2,
                left: containerWidth / 2
            };
        }
        rect.right = containerWidth - rect.width - rect.left;
        rect.bottom = containerHeight - rect.height - rect.top;
        return rect;
    }

    var BLightbox = register('b-lightbox', Lightbox.prototype);

    return BLightbox;
});
