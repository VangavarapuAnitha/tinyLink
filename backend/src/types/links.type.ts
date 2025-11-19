import { Request } from "express";

export interface PostProps {
  target_url: string;
  code: string;
}

export interface PathProps {
  code: string;
}
export interface CustomRequest extends Request {
  postBody?: PostProps;
  getOrDeletePath?: PathProps;
}
