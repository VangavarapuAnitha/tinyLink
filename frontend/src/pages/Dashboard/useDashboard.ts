import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

interface LinkType {
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string | null;
}
export const useDashboard = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const API = import.meta.env.VITE_API_URL;

  // Fetch all links
  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await axios.get<LinkType[]>(`${API}/links`);
      setLinks(res.data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const postSubmit = useCallback(() => {
    setOpenForm(false);
    fetchLinks();
  }, [setOpenForm, fetchLinks]);

  const handleDelete = async (code: string) => {
    try {
      await axios.delete(`${API}/links/${code}`);
      toast.success("Deleted!");
      fetchLinks();
    } catch (error) {
      console.log(error);
      toast.error("Deletion failed!");
    }
  };

  return {
    links,
    loading,
    openForm,
    setOpenForm,
    postSubmit,
    handleDelete,
  };
};
