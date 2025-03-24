import { RequestHandler } from "express";
import { ProxyLib } from "../types/proxyLib";
export declare const proxyLibinstance: ProxyLib;
export declare class RemoteError {
    _remote: boolean;
    source: string;
    error: any;
    constructor(source: string, error: any);
}
declare const _default: (url: string) => RequestHandler;
/**
 * @param {string} url fully qualified url
 */
export default _default;
