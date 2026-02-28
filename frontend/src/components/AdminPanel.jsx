import React, { useEffect, useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

function AdminPanel() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ nco_code: "", title: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const fetchJobs = async () => {
    try {
      setError(null);
      const res = await fetch("http://localhost:8000/api/v1/admin");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nco_code.trim() || !form.title.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to add job");
      }
      setForm({ nco_code: "", title: "" });
      setSuccessMsg("Job added successfully!");
      fetchJobs();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/v1/admin/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete job");
      setSuccessMsg("Job deleted successfully!");
      fetchJobs();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      {/* Optional Ashoka Chakra Watermark */}
      {/* <img
        src="/assets/ashoka_chakra.png"
        alt="Watermark"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "30rem",
          opacity: 0.12,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
        className="animate-spin-slow"
      /> */}

      {/* Page Container */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-8 relative z-10 my-12">
        {/* Header */}
        <header className="bg-[#0B3B60] text-white py-3 px-6 rounded-t-md mb-6 shadow-md">
          <div className="flex items-center gap-4">
            <img src="/emblem.png" alt="Emblem of India" className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-semibold">Government of India</h1>
              <p className="text-sm text-gray-200">Ministry of Labour & Employment</p>
            </div>
          </div>
        </header>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded border border-red-400 bg-red-100 text-red-700 text-center">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded border border-green-400 bg-green-100 text-green-700 text-center">
            {successMsg}
          </div>
        )}

        {/* Add Job Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mb-10 space-y-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="NCO Code"
              value={form.nco_code}
              onChange={(e) => setForm({ ...form, nco_code: e.target.value })}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#0B3B60] focus:outline-none shadow-sm"
              required
              aria-label="NCO Code"
            />
            <input
              type="text"
              placeholder="Job Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#0B3B60] focus:outline-none shadow-sm"
              required
              aria-label="Job Title"
            />
          </div>
          <button
            type="submit"
            className={`inline-flex items-center gap-2 bg-[#0B3B60] text-white px-6 py-3 rounded-md hover:bg-[#092d48] focus:ring-4 focus:ring-[#0B3B60] transition shadow-md ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loading}
            aria-disabled={loading}
          >
            <PlusCircle size={20} />
            {loading ? "Adding..." : "Add Job"}
          </button>
        </motion.form>

        {/* Jobs Table */}
        <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#0B3B60] text-white sticky top-0">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider">NCO Code</th>
                <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider">Title</th>
                <th className="px-5 py-3 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-5 py-6 text-center text-gray-500 font-medium">
                    No job codes available.
                  </td>
                </tr>
              ) : (
                jobs.map((job, idx) => (
                  <motion.tr
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-blue-50"}`}
                  >
                    <td className="px-5 py-3 font-mono text-gray-900">{job.nco_code}</td>
                    <td className="px-5 py-3 text-gray-800">{job.title}</td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                        aria-label={`Delete job code ${job.nco_code}`}
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Watermark Spin Animation */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default AdminPanel;
