import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/links.type";
import { getOrDeleteSchema, postSchema } from "../schemas/links.schema";
import Joi from "joi";
import { pool } from "../db";

// Middlewares
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
    } else if (req.method === "GET" || req.method === "DELETE") {
      //Validate path params
      const value = await getOrDeleteSchema.validateAsync(req.params, {
        abortEarly: false,
      });
      req.getOrDeletePath = value;

      //Check for code existence
      const { code } = value;
      const checkQuery = `select 1 from links where code=$1`;
      const result = await pool.query(checkQuery, [code]);
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "No record found with provided code",
        });
      }
    }

    next(); //Proceed with controllers
  } catch (error: any) {
    // Joi validation error
    if (error.isJoi) {
      return res.status(400).json({
        message: "Invalid input data",
        errors: error.details.map((err: Joi.ValidationErrorItem) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Other unexpected errors
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
