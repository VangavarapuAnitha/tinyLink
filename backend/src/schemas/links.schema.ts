import Joi from "joi";

//Schema for new url
export const postSchema = Joi.object()
  .keys({
    target_url: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
  })
  .unknown(false);

// Schema for delete/get url
export const getOrDeleteSchema = Joi.object()
  .keys({
    code: Joi.string().trim().required(),
  })
  .unknown(false);
