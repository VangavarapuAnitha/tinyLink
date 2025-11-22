import { Response } from "express";
import { CustomRequest } from "../types/links.type";
import { getRedirectURL } from "../services/redirect.service";

//Controller for get redirect url
export const getRedirectURLController = async (
  req: CustomRequest,
  res: Response
) => {
  const { code } = req.getOrDeletePath! || {};
  const result = await getRedirectURL({ code });
  if (!result.success) {
    return res
      .status(result.error?.code as number)
      .json({ message: result.error?.message });
  }
  return res.redirect(302, result.data);
};
