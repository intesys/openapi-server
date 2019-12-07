import { Request, Response } from "express";

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
}

export interface ProxyCall {
  (req: Request, res: Response): Promise<ProxyResponse>;
}

export interface ProxyLib {
  (method: method, url: string, headers?: any): ProxyCall;
}
