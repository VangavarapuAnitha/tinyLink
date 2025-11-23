import { useEffect, useState } from "react";
import axios from "axios";
import { Urls } from "../../utils/Urls.util";

export interface StatsType {
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string | null;
  created_at: string;
}

export const useStats = (code: string) => {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const url = Urls.RDLink(code);
        const res = await axios.get(url);
        setStats(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [code]);

  return { stats, loading, error };
};
