import { postService } from "../services/links.service";
import { CustomRequest } from "../types/links.type";
import { Response } from "express";

export const postController = async (req: CustomRequest, res: Response) => {
  const { target_url, code } = req.postBody! || {};
  const result = await postService({ target_url, code });
  if (!result.success) {
    return res.status(result.error?.code as number).json(result.error?.message);
  }
  return res.status(201).json(result.message);
};
