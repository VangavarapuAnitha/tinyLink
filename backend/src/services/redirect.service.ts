import { pool } from "../db";
import { PathProps } from "../types/links.type";

// Service to get redirect url
export const getRedirectURL = async ({ code }: PathProps) => {
  try {
    const query = `select target_url from links where code=$1`;
    const result = await pool.query(query, [code]);

    //Update clicks and last_clicked
    const updateQuery = `update links set clicks=clicks+1, last_clicked=NOW() where code=$1`;
    await pool.query(updateQuery, [code]);

    return {
      success: true,
      data: result.rows[0].target_url,
    };
  } catch (error) {
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
