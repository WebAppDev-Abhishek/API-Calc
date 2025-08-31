import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [data, setData] = useState({ count: 0, submissions: [] });

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to User Page
        </Link>
      </div>
      <p className="mb-4">Total Users: {data.count}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name 1</th>
              <th className="py-2 px-4">Name 2</th>
              <th className="py-2 px-4">Result</th>
              <th className="py-2 px-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {data.submissions.map((s) => (
              <tr key={s.id} className="border-t text-center hover:bg-gray-50">
                <td className="py-2 px-4">{s.id}</td>
                <td className="py-2 px-4">{s.name1}</td>
                <td className="py-2 px-4">{s.name2}</td>
                <td className="py-2 px-4 font-bold text-blue-600">{s.result}</td>
                <td className="py-2 px-4">{new Date(s.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
