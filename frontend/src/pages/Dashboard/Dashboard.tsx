import { useDashboard } from "./useDashboard";
import { Link } from "react-router-dom";
import { Button } from "../../components/shared";
import CreateLink from "../../components/CreateLink";
import { cn } from "../../utils/cn";
const Dashboard = () => {
  const { links, loading, openForm, setOpenForm, postSubmit, handleDelete } =
    useDashboard();
  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl text-blue-950">Dashboard</h1>
        <Button label="Add Link" onClick={() => setOpenForm(true)} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border-b border-gray-200">Code</th>
                <th className="p-2 border-b border-gray-200">Target URL</th>
                <th className="p-2 border-b border-gray-200">Clicks</th>
                <th className="p-2 border-b border-gray-200">Last Clicked</th>
                <th className="p-2 border-b border-gray-200">Actions</th>
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
                links.map((item, index) => {
                  const addBG = index !== 0 && index % 2 !== 0;
                  return (
                    <tr key={item.code} className={cn(addBG && "bg-gray-100")}>
                      <td className="p-2  font-mono text-center border-b border-gray-200">
                        {item.code}
                      </td>
                      <td className="p-2 border-b border-gray-200 truncate max-w-xs text-center">
                        <a
                          href={item.target_url}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          {item.target_url}
                        </a>
                      </td>
                      <td className="p-2 border-b border-gray-200 text-center">
                        {item.clicks}
                      </td>
                      <td className="p-2 border-b border-gray-200 text-center">
                        {item.last_clicked || "—"}
                      </td>
                      <td className="p-2 border-b border-gray-200 space-x-2 text-center">
                        <Link
                          to={`/code/${item.code}`}
                          className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-500 hover:text-white"
                        >
                          Stats
                        </Link>
                        <Button
                          onClick={() => handleDelete(item.code)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          label="Delete"
                        />
                      </td>
                    </tr>
                  );
                })
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
