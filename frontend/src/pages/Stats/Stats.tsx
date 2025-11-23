import { useParams } from "react-router-dom";
import { useStats } from "./useStats";

const Stats = () => {
  const { code } = useParams();
  const { stats, loading, error } = useStats(code!);

  if (loading) return <p className="text-center">Loading stats...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return <p>No stats found</p>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
        <h1 className="text-2xl font-semibold mb-4">Stats for: {stats.code}</h1>

        <div className="space-y-2">
          <p>
            <strong>Target URL:</strong> {stats.target_url}
          </p>
          <p>
            <strong>Total Clicks:</strong> {stats.clicks}
          </p>
          <p>
            <strong>Last Clicked:</strong> {stats.last_clicked || "Never"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(stats.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
