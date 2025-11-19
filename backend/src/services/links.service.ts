import { pool } from "../db";
import { PostProps } from "../types/links.type";

export const postService = async ({ target_url, code }: PostProps) => {
  console.log(target_url, code);
  try {
    const query = `insert into links(code,target_url) values($1,$2)`;
    await pool.query(query, [code, target_url]);
    //Return success
    return {
      success: true,
      message: "New URL generated",
    };
  } catch (err: any) {
    console.log("Error in postService(inserting new record):", err);
    //Duplicate code
    if (err.code === "23505") {
      return {
        success: false,
        error: {
          code: 409,
          message: "Duplicate code!",
        },
      };
    }
    //Unexpected error
    return {
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    };
  }
};
