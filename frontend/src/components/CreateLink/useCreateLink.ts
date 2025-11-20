import axios from "axios";
import { useState } from "react";
import { generateCode } from "../../utils/generateCode";
import type { CreateLinkProps } from "./CreateLink";

interface UseCreateLinkProps {
  postSubmit: CreateLinkProps["postSubmit"];
}

export const useCreateLink = ({ postSubmit }: UseCreateLinkProps) => {
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API = import.meta.env.VITE_API_URL;

  //Valid URL check
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAdd = async () => {
    if (targetUrl.trim() === "") {
      setError("Provide URL");
      return;
    }
    //Check for valid url
    if (!isValidUrl(targetUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    setAdding(true);
    try {
      // Generate code with length 8
      const code = await generateCode(8);
      // API Call
      await axios.post(`${API}/links`, {
        target_url: targetUrl,
        code,
      });
      setTargetUrl("");
      postSubmit();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };
  return { handleAdd, setTargetUrl, targetUrl, adding, error };
};
