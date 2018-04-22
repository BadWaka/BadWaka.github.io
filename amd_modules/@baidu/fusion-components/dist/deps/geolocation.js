/**
 * 提供 html5 定位能力
 *
 * @file   geolocation.js
 * @author lizhaoming
 */

/* globals page */

define(function () {
    /* eslint-disable fecs-camelcase */
    var lbsService = 'http://aladdin.wapmap.baidu.com/plugin';
    var rgcService = 'http://api.map.baidu.com/?qt=rgc&dis_poi=100&poi_num=10&ie=utf-8&oue=1&res=api';
    var defaults = {
        autoLoc: {
            expireTime: 0,
            onlyFromCookie: false,
            onlyFromHTML5: false,
            onlyFromNative: false,
            autoSaveToCookie: true,
            html5Timeout: 8000,
            nativeTimeout: 8000,
            onSuccess: null,
            onFail: null
        },
        search: {
            timeout: 8000,
            onSuccess: null,
            onFail: null
        }
    };
    var geoCookie;

    // 适配https, 由于首页里这个脚本并未用smarty渲染，所以地址写死
    if (location.protocol.indexOf('https') !== -1) {
        lbsService = 'https://sp2.baidu.com/90gHaDqh_cgXo1ufo-zN2TxrfQVwcu8e/plugin';
        rgcService = 'https://sp2.baidu.com/9_Q4sjOpB1gCo2Kml5_Y_D3/?qt=rgc&dis_poi=100&poi_num=10&ie=utf-8&oue=1&res=api';
    }

    var geoLocation = {
        getPosition: function (options) {
            options = extend({}, defaults.autoLoc, options);

            var expireTime = options.expireTime;
            if (expireTime > 0 || (expireTime === 0 && options.onlyFromCookie === true)) {
                var position = geoCookie.get();
                if (position && (parseInt(Date.now(), 10) - position.timestamp <= expireTime || expireTime === 0)) {
                    processCallback(options.onSuccess, position.output(), {
                        from: 'cookie'
                    });
                    return;
                }
            }

            if (options.onlyFromCookie === true) {
                processCallback(options.onFail, {
                    error: 1
                });
                return;
            }

            var self = this;
            var isAndroid = /android/i.test(navigator.userAgent);

            if (options.onlyFromHTML5 || !options.onlyFromNative) {
                // get HTML5 location
                getHTML5Position(function (result) {
                    // convert coordinates and get address details.
                    parseCoords(result, function (position) {
                        if (options.autoSaveToCookie === true) {
                            position = self.savePosition(position);
                        }

                        processCallback(options.onSuccess, position, {
                            from: 'html5'
                        });
                    }, function () {
                        if (isAndroid && !options.onlyFromHTML5) {
                            processCallback(options.onFail, {
                                error: 3
                            });
                        }
                        else {
                            processCallback(options.onFail, {
                                error: 3
                            });
                        }
                    }, options.html5Timeout);
                }, function (e) {
                    if (isAndroid && !options.onlyFromHTML5) {
                        processCallback(options.onFail, {
                            error: 3
                        });
                    }
                    else {
                        processCallback(options.onFail, e);
                    }
                }, options.html5Timeout);
            }
            else {
                processCallback(options.onFail, {
                    error: 3
                });
            }
        },

        searchAddress: function (address, cityCode, options) {
            options = extend({}, defaults.search, options, {
                addr: address || '',
                city_code: cityCode || 0
            });
            if (window.page && page.log && page.log.send) {
                page.log.send({
                    ct: 11,
                    cst: 1,
                    clk_from: 'sgeo'
                });
            }
            getJSONP({
                url: lbsService,
                data: {
                    ptype: 2,
                    addr: address || '',
                    city_code: cityCode || 0
                },
                timeout: options.timeout,
                onSuccess: function (data) {
                    var result = [];
                    if (data && data.content) {
                        var cityCode = data.current_city.code;
                        var content = [].concat(data.content);
                        for (var i = 0; i < content.length; i++) {
                            var poi = content[i];
                            var geo = poi.geo.split('|')[2].replace(';', '').split(',');
                            var name;
                            var address;
                            if (poi.city_type != null) {
                                name = address = poi.cname;
                            }
                            else {
                                name = poi.name;
                                address = poi.addr;
                            }

                            var position = new Position(geo[0], geo[1], 200, cityCode, undefined, name, address);
                            result.push(position.output());
                        }
                    }

                    processCallback(options.onSuccess, result);
                },
                onFail: function () {
                    processCallback(options.onFail, {
                        error: 1
                    });
                }
            });
        },

        savePosition: function (position) {
            return geoCookie.set(position);
        },

        clearPosition: function () {
            return geoCookie.remove();
        },

        mercatorToAddress: function (options) {
            var defaults = {
                timeout: 8000,
                onSuccess: null,
                onFail: null
            };

            options = extend({}, defaults, options);

            rgcRequest({
                longitude: options.x,
                latitude: options.y,
                accuracy: options.accuracy
            }, function (position) {
                position.accuracy = position.accuracy || 200;
                processCallback(options.onSuccess, position);
            }, function () {
                processCallback(options.onFail, {
                    error: 1
                });
            }, options.timeout);
        }
    };

    function getHTML5Position(onSuccess, onFail, timeout) {
        if (!navigator.geolocation) {
            processCallback(onFail, {
                error: 2
            });
        }

        var timer = null;
        var onFailProcessed = false;

        navigator.geolocation.getCurrentPosition(function (result) {
            clearTimeout(timer);
            processCallback(onSuccess, result.coords);
        }, function (error) {
            if (onFailProcessed) {
                return;
            }

            onFailProcessed = true;
            clearTimeout(timer);
            if (error.code === error.PERMISSION_DENIED) {
                processCallback(onFail, {
                    error: 4
                });
            }
            else {
                processCallback(onFail, {
                    error: 2
                });
            }
        }, {
            timeout: timeout,
            maximumAge: 0,
            enableHighAccuracy: true
        });

        timer = setTimeout(function () {
            if (onFailProcessed) {
                return;
            }

            onFailProcessed = true;
            clearTimeout(timer);
            processCallback(onFail, {
                error: 2
            });
        }, timeout);
    }

    function parseCoords(coords, onSuccess, onFail, timeout) {
        if (window.page && page.log && page.log.send) {
            page.log.send({
                ct: 11,
                cst: 1,
                clk_from: 'sgeo'
            });
        }
        /* 这个接口有时候会返回空, 增加重试机制 */
        var retries = 0;
        var MAX_RETRY = 2;
        var callParser = function(coords, onSuccess, onFail, timeout) {
            getJSONP({
                url: lbsService,
                data: {
                    ptype: 1,
                    xyr: coords.longitude + "_" + coords.latitude + "_" + coords.accuracy,
                    addr: "city|district|street|city_code"
                },
                timeout: timeout,
                onSuccess: function (result) {
                    if (result !== undefined) {
                        var point = result.point,
                            addr = result.addr;
                        if (point && addr && addr.city_code) {
                            var position = new Position(point.x, point.y, coords.accuracy, addr.city_code, undefined, result.address, result.address, addr);
                            return processCallback(onSuccess, position.output());
                        }
                    }

                    if (retries < MAX_RETRY) {
                        retries++;
                        return callParser(coords, onSuccess, onFail, timeout);
                    } else {
                        return processCallback(onFail);
                    }
                },
                onFail: onFail
            });
        };
        callParser(coords, onSuccess, onFail, timeout);
    }

    function rgcRequest(coords, onSuccess, onFail, timeout) {
        getJSONP({
            url: rgcService,
            data: {
                x: coords.longitude,
                y: coords.latitude
            },
            timeout: timeout,
            onSuccess: function (result) {
                var content = result && result.content;
                var addressDetail = content && content.address_detail;
                var cityCode = addressDetail && addressDetail.city_code;
                var point = content && content.surround_poi;

                if (content && addressDetail && cityCode && cityCode !== 0) {
                    var position = new Position(coords.longitude, coords.latitude, coords.accuracy, cityCode, undefined, content.address, content.address, {
                        city: addressDetail.city,
                        district: addressDetail.district,
                        street: addressDetail.street,
                        cityCode: cityCode
                    });
                    processCallback(onSuccess, position.output());
                }
                else {
                    processCallback(onFail);
                }
            },
            onFail: onFail
        });
    }

    function processCallback(callback, data, state) {
        typeof callback === 'function' && callback(data, state);
    }

    function Position(x, y, accuracy, cityCode, timestamp, name, address, addr) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.accuracy = parseFloat(accuracy);
        this.cityCode = parseInt(cityCode, 10);
        this.timestamp = parseInt(timestamp, 10) || '';
        this.name = name || '';
        this.address = address || '';
        this.addr = addr || undefined;
    }

    Position.prototype.getCookieString = function () {
        return this.x + '_' + this.y + '_' + this.accuracy + '_' + this.cityCode + '_' + this.timestamp;
    };

    Position.prototype.output = function () {
        return {
            x: this.x,
            y: this.y,
            accuracy: this.accuracy,
            cityCode: this.cityCode,
            timestamp: this.timestamp,
            name: this.name,
            address: this.address,
            addr: this.addr || {}
        };
    };

    Position.readFromCookie = function (cookie) {
        var info = cookie.split('_');
        return new Position(info[0], info[1], info[2], info[3], info[4]);
    };

    Position.readFromObject = function (object) {
        return new Position(
            object.x, object.y,
            object.accuracy, object.cityCode,
            object.timestamp, object.name,
            object.address, object.addr
        );
    };

    geoCookie = {
        domain: '.baidu.com',
        path: '/',
        key: 'BAIDULOC',
        duration: 172800000, // 48h, 2 * 24 * 3600 * 1000

        get: function () {
            if (!navigator.cookieEnabled) {
                return false;
            }

            var match = document.cookie.match(new RegExp(this.key + '=([^;]+);?'));

            if (match) {
                return Position.readFromCookie(match[1]);
            }

            return false;
        },

        set: function (position) {
            if (!navigator.cookieEnabled) {
                return false;
            }

            position = Position.readFromObject(position);
            var expiration = new Date();
            expiration.setTime(expiration.getTime() + this.duration);
            position.timestamp = parseInt(Date.now(), 10);
            document.cookie = this.key + '=' + position.getCookieString()
             + ';domain=' + this.domain + ';path=' + this.path
             + ';expires=' + expiration.toGMTString();
            return position.output();
        },

        remove: function () {
            if (!navigator.cookieEnabled) {
                return false;
            }

            document.cookie = this.key + '=;domain=' + this.domain
             + ';path=' + this.path
             + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
            return true;
        }
    };

    function extend(merged) {
        var sources = [].slice.call(arguments, 1);
        for (var i = 0; i < sources.length; i++) {
            for (var property in sources[i]) {
                merged[property] = sources[i][property];
            }
        }
        return merged;
    }

    var jsonpCallbackCounter = 0;
    function getJSONP(options) {
        var defaultOptions = {
            timeout: 8000,
            data: {},
            onSuccess: null,
            onFail: null
        };

        options = extend({}, defaultOptions, options);
        var callbackName = 'geojsonp' + (++jsonpCallbackCounter);
        options.data.callback = callbackName;

        var timeout = false;

        var timer = setTimeout(function () {
            delete window[callbackName];
            timeout = true;
            processCallback(options.onFail);
        }, options.timeout);

        window[callbackName] = function (data) {
            clearTimeout(timer);
            if (timeout) {
                return;
            }

            processCallback(options.onSuccess, data);
            delete window[callbackName];
        };

        var src = options.url + (options.url.indexOf('?') + 1 ? '&' : '?');
        var paramPairs = [];
        for (var property in options.data) {
            paramPairs.push(property + '=' + encodeURIComponent(options.data[property]));
        }
        src += paramPairs.join('&');

        var script = document.createElement('script');

        // 部分浏览器请求moplus直接报错
        script.onerror = function () {
            clearTimeout(timer);
            processCallback(options.onFail);
        };

        script.type = 'text/javascript';
        script.src = src;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    return geoLocation;
});
