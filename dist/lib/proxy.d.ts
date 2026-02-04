import { RequestHandler } from "express";
import { ProxyLib } from "../types/proxyLib";
export declare const proxyLibinstance: ProxyLib;
export declare class RemoteError {
    _remote: boolean;
    source: string;
    error: any;
    constructor(source: string, error: any);
}
/**
 * @param {string} url fully qualified url
 */
declare const _default: (url: string) => RequestHandler;
export default _default;
