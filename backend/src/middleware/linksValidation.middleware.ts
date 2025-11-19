import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/links.type";
import { postSchema } from "../schemas/links.schema";
import Joi from "joi";

export const linksValidation = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === "POST") {
      const value = await postSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      console.log(value);
      req.postBody = value;
    }

    next(); //Proceed with controllers
  } catch (error: any) {
    // Joi validation error
    if (error.isJoi) {
      return res.status(400).json({
        status: "validation_error",
        message: "Invalid input data",
        errors: error.details.map((err: Joi.ValidationErrorItem) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Other unexpected errors
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
