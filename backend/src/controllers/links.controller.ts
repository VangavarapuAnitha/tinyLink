import {
  postService,
  deleteURL,
  getLinks,
  stats,
} from "../services/links.service";
import { CustomRequest } from "../types/links.type";
import { Response } from "express";

//Controller for new url
export const postController = async (req: CustomRequest, res: Response) => {
  const { target_url, code } = req.postBody! || {};
  const result = await postService({ target_url, code });
  if (!result.success) {
    return res
      .status(result.error?.code as number)
      .json({ message: result.error?.message });
  }
  return res.status(201).json(result.message);
};

// COntroller for stats
export const statsController = async (req: CustomRequest, res: Response) => {
  const { code } = req.getOrDeletePath! || {};
  const result = await stats({ code });
  if (!result.success) {
    return res
      .status(result.error?.code as number)
      .json({ message: result.error?.message });
  }
  return res.status(200).json(result.data);
};

// Controller for delete url with code
export const deleteController = async (req: CustomRequest, res: Response) => {
  const { code } = req.getOrDeletePath! || {};
  const result = await deleteURL({ code });
  if (!result.success) {
    return res
      .status(result.error?.code as number)
      .json({ message: result.error?.message });
  }
  return res.status(200).json(result.message);
};

// GET all links data
export const getLinksController = async (req: CustomRequest, res: Response) => {
  const result = await getLinks();
  if (!result.success) {
    return res
      .status(result.error?.code as number)
      .json({ message: result.error?.message });
  }
  return res.status(200).json(result.data);
};
