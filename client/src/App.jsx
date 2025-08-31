import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/submit", { name1, name2 });
      setResult(res.data.result);
    } catch (err) {
      alert("Error submitting data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Enter Names</h1>
        <input
          className="border p-2 w-full mb-4 rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="First Name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4 rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Second Name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>

        {result && (
          <div className="mt-6 text-center">
            <div className="inline-block px-6 py-3 bg-green-100 text-green-700 font-bold rounded-xl shadow">
              Result: {result}
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/admin" className="text-blue-600 hover:underline">
            Go to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
