import { useEffect, useState } from "react";
import axios from "axios";

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
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (!code) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/links/${code}`);
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
