import Joi from "joi";

export const postSchema = Joi.object()
  .keys({
    target_url: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
  })
  .unknown(false);
