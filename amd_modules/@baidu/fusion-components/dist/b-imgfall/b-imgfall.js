define(function (require) {

    var register = require('../deps/fusion.best');
    var IScroll = require('./iscroll');
    var Lightbox = require('../b-lightbox/b-lightbox');

    function Imgfall() {}

    Imgfall.prototype = {
        props: {
            itemFadeInDuration: {
                type: Number,
                value: 300,
                onChange: function(old, now) {
                    this.$element.find('b-lightbox').attr('fadeInDuration', now);
                }
            },
            itemFadeOutDuration: {
                type: Number,
                value: 200,
                onChange: function(old, now) {
                    this.$element.find('b-lightbox').attr('fadeOutDuration', now);
                }
            },
            offsetTop: {
                type: Number,
                value: 10
            }
        },

        tpl: "<div class=\"b-imgfall-result\"></div>\n<div class=\"b-imgfall-loading\"></div>\n<b-lightbox fadeInDuration=\"300\" itemFadeOutDuration=\"200\"></b-lightbox>\n",
        css: "b-imgfall .b-imgfall-loading {  padding-bottom: 15px;  padding-top: 15px;  text-align: center;}b-imgfall .b-imgfall-result {  margin-left: auto;  margin-right: auto;}b-imgfall .b-imgfall-result li {  font-size: 0;  margin-top: 2px;  white-space: nowrap;  overflow: hidden;  line-height: 0;}b-imgfall .b-imgfall-result li a {  display: inline-block;  cursor: pointer;}b-imgfall .b-imgfall-result li a:first-child {  margin-right: 2px;}b-imgfall .b-infinitescroll-page {  padding: 0px;  margin: 0px;}",
        ERROR_HTML: "<div class=\"b-imgfall-load-error c-color-gray\">\n  加载超时，请重试 <i class=\"c-icon c-gap-left-small\">&#xe61d</i>\n</div>\n",
        NOMORE_HTML: "<div class=\"b-imgfall-nomore c-color-gray\">\n  已经到最底啦～\n</div>\n",
        LOADING_HTML: "<div class=\"c-loading\">\n  <i class=\"c-icon\">&#xe780</i>\n  <p>加载中...</p>\n</div>\n",

        created: function() {
            this.$element = $(this.element);
            this.lightbox = this.setupLightbox();
        },
        fall: function(options){
            this.pager = pagerAdapter(options.getNextPage);
            this.is = this.createIScroll();
        },
        destroy: function() {
            this.lightbox.hide();
            this.is.pause();
        },
        attached: function() {
            this.is && this.is.pause();
        },
        detached: function() {
            this.is && this.is.start();
        },
        setupLightbox: function() {
            var lightboxEle = this.$('b-lightbox').get(0);
            lightboxEle.fusionReady = function () {
                var lightbox = this.lightbox = this.$('b-lightbox').prop('fusion');
                lightbox.getNextPage = function() {
                    // wrap `this.getNextPage` to provide dynamic configurability
                    return this.getNextPage.apply(this, arguments);
                }.bind(this);
                lightbox.on('shown', function(event, idx) {
                    return this.trigger('item-shown', [idx])
                }.bind(this));
                lightbox.on('hidden', function(event, idx) {
                    return this.trigger('item-hidden', [idx])
                }.bind(this));
                lightbox.on('switched', function(event, idx, direction) {
                    return this.trigger('item-switched', [idx, direction])
                }.bind(this));
                this.$element.on('click', 'li a img', function(event) {
                    var $img = $(event.target),
                        idx = $img.data('idx');

                    lightbox.images = this.pager.getItems().map(function(image) {
                        return image.origin;
                    });
                    lightbox.show(idx, $img, $img.prop('src'));
                }.bind(this));
            }.bind(this);
        },
        createIScroll: function() {
            return new IScroll({
                $result: this.$element.find(".b-imgfall-result"),
                $loading: this.$element.find(".b-imgfall-loading"),
                loadingHtml: this.LOADING_HTML,
                loadOverHtml: this.NOMORE_HTML,
                loadFailHtml: this.ERROR_HTML,
                // height of the fixed navbar + 10px
                bufferHeightPx: this.getProp('offsetTop'),
                pushResult: this.getLine.bind(this)
            });
        },

        /*
         * Get array of HTML string for the given iscroll line
         */
        getLine: function(line) {
            return this.pager.getPageAt(line)
                .then(function(images) {
                    return images.map(function(image) {
                        return image.thumbnail;
                    });
                })
                .then(function(data) {
                    var i, lis = [];
                    for (i = 0; i < data.length / 2; i++) {
                        var img1 = data[2 * i],
                            img2 = data[2 * i + 1];
                        var width = this.$element.find('.b-imgfall-result').prop('clientWidth');
                        lis.push(renderTupple(width, img1, img2));
                    }
                    return lis;
                }.bind(this))
                .then(function(lis) {
                    return lis.length ? lis : 'NULL';
                });
        },
    };

    /*
     * A pager adapter: make a pager from given getNextPage function
     * @param {Function} getNextPage get next page of items
     * @return {Object}
     *      getItems: get all items in all pages
     *      getPageAt: get the specified page
     *      getNextPage: the raw getNextPage function
     */
    function pagerAdapter(getNextPage) {
        var pages = [];
        var count = 0;
        var queue = $.Deferred().resolve(pages);

        function getItems() {
            var items = [];
            pages.forEach(function(page) {
                items = items.concat(page);
            });
            return items;
        }

        function getPageAt(i) {
            return queue.then(function() {
                if (i < pages.length) return $.Deferred().resolve(pages[i]);
                // asume one page is enough
                return getNextPage().then(function(items) {
                    var page = items.map(function(item) {
                        item = {
                            idx: count++,
                            thumbnail: parseImage(item.thumbnail),
                            origin: parseImage(item.origin)
                        };
                        item.thumbnail.idx = item.idx;
                        return item;
                    });
                    pages.push(page);
                    return page;
                });
            });
        }

        return {
            getPageAt: getPageAt,
            getItems: getItems
        };
    }

    /*
     * Parse image data
     */
    function parseImage(img) {
        return {
            width: parseInt(img.width),
            height: parseInt(img.height),
            src: img.src
        };
    }

    /*
     * Render 2 images in the same line
     * @param {Number} total_width the width of the container
     * @param {Object} img1 the first image
     * @param {Object} img2 the second image
     */
    function renderTupple(total_width, img1, img2) {
        // Single Image Per Line
        if (img2 === undefined) {
            img1.display = {
                width: total_width,
                height: img1.height * total_width / img1.width
            };
            var $li = $('<li>').append(renderImg(img1));
            return $li.prop('outerHTML');
        }
        var h1 = 200,
            h2 = 200,
            w1 = total_width / 2,
            w2 = total_width / 2;

        // Algorithm:
        // r1 = L / (w1 + w2 h1 / h2)
        // r2 = h1 r1 / h2

        var r1 = total_width / (img1.width +
            img2.width * img1.height / img2.height);
        var r2 = img1.height * r1 / img2.height;

        h1 = Math.floor(r1 * img1.height);
        h2 = Math.floor(r2 * img2.height);
        w1 = Math.floor(r1 * img1.width);
        w2 = Math.floor(r2 * img2.width);

        // Two Image Per Line, with 2px margin: 1px + 1px
        img1.display = {
            height: h1,
            width: w1 - 1
        };
        img2.display = {
            height: h2,
            width: w2 - 1
        };

        $li = $('<li>')
            .append(renderImg(img1))
            .append(renderImg(img2));

        return $li.prop('outerHTML');
    }

    /*
     * Render an <img> element from image data
     * @param {Object} data the image data
     */
    function renderImg(data) {
        var $img = $('<img>')
            .attr('height', data.display.height + 'px')
            .attr('width', data.display.width + 'px')
            .attr('src', data.src)
            .data('idx', data.idx);
        return $('<a>')
            .append($img);
    }


    var BImgfall = register('b-imgfall', Imgfall.prototype);
    return BImgfall;
});
