import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

export type method =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "head"
  | "delete"
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "HEAD"
  | "DELETE"
  | "OPTIONS"
  | "TRACE"
  | "options"
  | "trace";

export interface ProxyResponse {
  data: any;
  headers: any;
  status: number;
}

export interface ProxyCall {
  (req: Request, res: Response): Promise<ProxyResponse>;
}

export interface ProxyLib {
  (method: method, url: string, headers?: IncomingHttpHeaders): ProxyCall;
}
