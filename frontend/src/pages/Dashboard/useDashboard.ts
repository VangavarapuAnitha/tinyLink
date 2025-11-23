import { useCallback, useEffect, useState } from "react";
import { Urls } from "../../utils/Urls.util";
import axios from "axios";
import { toast } from "react-toastify";

interface LinkType {
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string | null;
}

//Talon for Dashboard
export const useDashboard = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openForm, setOpenForm] = useState<boolean>(false);

  // Fetch all links
  const fetchLinks = async () => {
    try {
      setLoading(true);
      const url = Urls.links();
      const res = await axios.get<LinkType[]>(url);
      setLinks(res.data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch links on mount
  useEffect(() => {
    fetchLinks();
  }, []);

  //Post submit after adding
  const postSubmit = useCallback(() => {
    setOpenForm(false);
    fetchLinks();
  }, [setOpenForm, fetchLinks]);

  // Delete URL
  const handleDelete = async (code: string) => {
    try {
      const url = Urls.RDLink(code);
      await axios.delete(url);
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
