import {
  postService,
  getRedirectURL,
  deleteURL,
  getLinks,
} from "../services/links.service";
import { CustomRequest } from "../types/links.type";
import { Response } from "express";

//Controller for new url
export const postController = async (req: CustomRequest, res: Response) => {
  const { target_url, code } = req.postBody! || {};
  const result = await postService({ target_url, code });
  if (!result.success) {
    return res.status(result.error?.code as number).json(result.error?.message);
  }
  return res.status(201).json(result.message);
};

//Controller for get redirect url
export const getRedirectURLController = async (
  req: CustomRequest,
  res: Response
) => {
  const { code } = req.getOrDeletePath! || {};
  const result = await getRedirectURL({ code });
  if (!result.success) {
    return res.status(result.error?.code as number).json(result.error?.message);
  }
  return res.redirect(302, result.data);
};

// Controller for delete url with code
export const deleteController = async (req: CustomRequest, res: Response) => {
  const { code } = req.getOrDeletePath! || {};
  const result = await deleteURL({ code });
  if (!result.success) {
    return res.status(result.error?.code as number).json(result.error?.message);
  }
  return res.status(200).json(result.message);
};

// GET all links data
export const getLinksController = async (req: CustomRequest, res: Response) => {
  const result = await getLinks();
  if (!result.success) {
    return res.status(result.error?.code as number).json(result.error?.message);
  }
  return res.status(200).json(result.data);
};
