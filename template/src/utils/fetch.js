
/**
 * Util module.
 * wrap XHR with promise.
 * @module src/util
 * @author yannliao <hzliaoyanhua@corp.netease.com>
 */
'use strict';

import { Promise } from 'es6-promise';

/**
 * fetch function.
 * @param {Sring} url - target url.
 * @param {Object} opt - some options used in XHR.
 * @return {Object} promise - an promies Object. 
 */
function fetch(url, opt) {
  if (typeof url !== 'string') {
    throw new TypeError('url needed!');
  }
  /**
   * method - XHR method, default GET.
   * responseType - default json.
   * headers - header object.
   * body - body data.
   */
  var options = {
    method: "GET",
    responseType: "json",
    headers: null,
    body: null
  };

  if (!!opt) {
    assign(options, opt);
  }
  /**
   * create a new promise.
   */
  var promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handler;
    xhr.open(options.method, url, true);
    xhr.responseType = options.responseType;
    if (!!options.headers) {
      for (var name in options.headers) {
        if (options.headers.hasOwnProperty(name)) {
          xhr.setRequestHeader(name, options.headers[name]);
        }
      }
    }

    xhr.send(options.body || null);
    /**
     * response handle function.
     */
    function handler() {
      switch (xhr.readyState) {
        case 0: //UNSENT
          //do something
          break;
        case 1: //OPENED
          //do something
          break;
        case 2: //HEADERS_RECEIVED
          //do something
          break;
        case 3: //LOADING
          //do something
          break;
        case 4: //DONE
          if ((this.status >= 200 && this.status < 300) || this.status === 304) {
            var data = {
              response: this.response,
              responseType: this.responseType
            };

            switch (this.responseType) {
              case "":
                data.responseText = this.responseText;
                data.responseXML = this.responseXML;
                break;
              case "text":
                data.responseText = this.responseText;
                data.responseXML = this.responseXML;
                break;
              case "document":
                data.responseXML = this.responseXML;
                break;
            }

            resolve(data);
          } else {
            reject(new Error(this.statusText));
          }
          break;
      }
    }
  });
  return promise;
}
/**
 * object deep copy function.
 * @param {Object} target - target object.
 * @param {Object} source - source object.
 * @return {Object} target - return the target result.
 */
function assign(target, source) {
  for (var prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      if (typeof source[prop] === 'object') {
        if (Array.isArray(source[prop])) {
          target[prop] = [];
        } else {
          target[prop] = {};
        }
        assign(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}
/** 
 * Util functions.
 */
// export default {
//   fetch: fetch,
//   assign: assign
// };
/** 
 * Util functions.
 */
export { fetch, assign };
