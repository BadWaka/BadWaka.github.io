/**
* 添加etpl扩展插件，并且etpl封装到page.etpl
*/

/* globals page */

define(function (require) {

    var etpl = require('./etpl');

    /*
        * 大搜导流跳转链接
        * useage: ${string|html|linksearch(${opts})}
        */
    etpl.addFilter('linksearch', function(query, opts) {
        if (query
            && window.page
            && page.utils
            && page.utils.link.getSearchUrl
        ) {
            opts = opts || {};
            return page.utils.link.getSearchUrl(query, opts);
        }
        return '';
    });

    /*
        * tc跳转链接
        * useage: ${string|linktc(${opts})}
        */
    etpl.addFilter('linktc', function(url, opts) {
        if (url
            && window.page
            && page.utils
            && page.utils.link
            && page.utils.link.getJumpLinkUrl
        ) {
            opts = opts || {};
            if (!opts.nsrc) {
                opts.src = url;
            }
            return page.utils.link.getJumpLinkUrl(opts);
        }
        return '';
    });

    /*
        * https域名转换
        * useage: ${string|https}
        */
    etpl.addFilter('https', function(url) {
        if (url
            && window.page
            && page.https
            && page.https.domain
            && page.https.domain.get
        ) {
            return page.https.domain.get(url);
        }
        return '';
    });

    return etpl;
});
