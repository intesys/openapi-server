"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterHeaders = void 0;
/**
 * For reference, look at https://github.com/postmanlabs/postman-request#proxies
 */
const proxyHeaderExclusiveList = [
    "accept",
    "accept-charset",
    "accept-encoding",
    "accept-language",
    "accept-ranges",
    "cache-control",
    "content-encoding",
    "content-language",
    "content-length",
    "content-location",
    "content-md5",
    "content-range",
    // "content-type", // we want content type
    "connection",
    "date",
    "expect",
    "max-forwards",
    "pragma",
    "proxy-authorization",
    "referer",
    "te",
    "transfer-encoding",
    "user-agent",
    "via",
];
const filterHeaders = (headers) => {
    return Object.keys(headers).reduce((res, header) => {
        if (proxyHeaderExclusiveList.indexOf(header) < 0) {
            res[header] = headers[header];
        }
        return res;
    }, {});
};
exports.filterHeaders = filterHeaders;
//# sourceMappingURL=utils.js.map