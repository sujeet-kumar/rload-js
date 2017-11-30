/**
 * Promise based resource loader for JS and CSS
 * 
 * @author Sujeet Kumar <sujeetkv90@gmail.com>
 * @link https://github.com/sujeet-kumar/rload-js
 */
(function (context) {
    
    'use strict';
    
    context.rLoad = (function () {
        
        var thisContext = this || {};
        
        thisContext.isPromise = function (p) {
            return (p instanceof Promise && typeof p.then === 'function' && typeof p.catch === 'function');
        };
        
        thisContext.loader = function (type, uri, attributes, parent) {
            parent = (parent || 'head').toLowerCase();
            
            if (Array.isArray(uri)) {
                var loaders = [];
                uri.forEach(function (resource) {
                    if (thisContext.isPromise(resource)) {
                        loaders.push(resource);
                    } else {
                        loaders.push(thisContext.loader(type, resource, attributes, parent));
                    }
                });
                return Promise.all(loaders);
            }
            
            return new Promise(function (resolve, reject) {
                var element = document.createElement(type);
                element.charset = 'utf-8';
                
                element.onload = function () {
                    resolve(uri);
                };
                element.onerror = function () {
                    reject(new Error('Could not load resource: ' + uri));
                };
                
                switch (type) {
                    case 'script':
                        element.type = 'text/javascript';
                        element.async = true;
                        element.src = uri;
                        break;
                    case 'link':
                        element.rel = 'stylesheet';
                        element.type = 'text/css';
                        element.href = uri;
                        break;
                }
                
                if (Object.prototype.toString.call(attributes) === '[object Object]') {
                    for (var attr in attributes) {
                        if (!element[attr] && typeof attributes[attr] === 'string') {
                            element[attr] = attributes[attr];
                        }
                    }
                }
                
                var base = document.getElementsByTagName('base');
                if (base.length) {
                    base[0].parentNode.insertBefore(element, base[0]);
                } else {
                    var parents = document.getElementsByTagName(parent);
                    if (!parents.length) {
                        throw new Error('Can not find parent element \'' + parent + '\'');
                    } else {
                        parents[0].appendChild(element);
                    }
                }
            });
        };
        
        thisContext.resolveLoader = function (loaderArr) {
            var loaders = [];
            if (!Array.isArray(loaderArr)) {
                throw new TypeError('Invalid argument passed: Array expected');
            } else {
                loaderArr.forEach(function (resource) {
                    if (thisContext.isPromise(resource)) {
                        loaders.push(resource);
                    } else {
                        throw new TypeError('Invalid Promise object');
                    }
                });
            }
            return Promise.all(loaders);
        };
        
        return {
            js: function (uri, attributes, parent) {
                return thisContext.loader('script', uri, attributes, parent);
            },
            css: function (uri, attributes) {
                return thisContext.loader('link', uri, attributes);
            },
            all: function (rLoadArr) {
                return thisContext.resolveLoader(rLoadArr);
            }
        };
        
    })();
    
})(this);
