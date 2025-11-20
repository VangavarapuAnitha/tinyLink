import { useDashboard } from "./useDashboard";
import { Link } from "react-router-dom";
import { Button } from "../../components/shared";
import CreateLink from "../../components/CreateLink";
const Dashboard = () => {
  const { links, loading, openForm, setOpenForm, postSubmit, handleDelete } =
    useDashboard();
  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-lg">Dashboard</h1>
        <Button label="Add Link" onClick={() => setOpenForm(true)} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border ">Code</th>
                <th className="p-2 border">Target URL</th>
                <th className="p-2 border">Clicks</th>
                <th className="p-2 border">Last Clicked</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-2 text-gray-500">
                    No links yet. Create one!
                  </td>
                </tr>
              ) : (
                links.map((item) => (
                  <tr key={item.code} className="border">
                    <td className="p-2 border font-mono">{item.code}</td>
                    <td className="p-2 border truncate max-w-xs">
                      <a
                        href={item.target_url}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        {item.target_url}
                      </a>
                    </td>
                    <td className="p-2 border">{item.clicks}</td>
                    <td className="p-2 border">{item.last_clicked || "—"}</td>
                    <td className="p-2 border space-x-2">
                      <Link
                        to={`/code/${item.code}`}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        Stats
                      </Link>
                      <Button
                        onClick={() => handleDelete(item.code)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        label="Delete"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {openForm && (
        <CreateLink
          onClose={() => setOpenForm(false)}
          postSubmit={postSubmit}
        />
      )}
    </div>
  );
};

export default Dashboard;
