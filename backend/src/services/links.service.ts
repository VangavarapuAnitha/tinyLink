import { pool } from "../db";
import { PathProps, PostProps } from "../types/links.type";

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

// Service to get redirect url
export const getRedirectURL = async ({ code }: PathProps) => {
  try {
    const query = `select target_url from links where code=$1`;
    const result = await pool.query(query, [code]);
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

// Service to delete url with code
export const deleteURL = async ({ code }: PathProps) => {
  try {
    const query = `delete from links where code=$1`;
    await pool.query(query, [code]);
    return {
      success: true,
      message: "Deleted!",
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

// Get all links
export const getLinks = async () => {
  try {
    const query = `select code,target_url,clicks,last_clicked from links`;
    const result = await pool.query(query);
    return {
      success: true,
      data: result.rows,
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
