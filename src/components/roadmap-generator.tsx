"use client";

import { useState } from "react";

interface RoadmapGeneratorProps {
  onClose: () => void;
}

export function RoadmapGenerator({ onClose }: RoadmapGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [roadmapHtml, setRoadmapHtml] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const profileData = {
      name: formData.get("name") as string,
      college_name: formData.get("college") as string,
      current_year: parseInt(formData.get("currentYear") as string),
      passed_out_year: parseInt(formData.get("gradYear") as string),
      current_skills: (formData.get("currentSkills") as string)
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      target_skills: (formData.get("targetSkills") as string)
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      interested_domain: formData.get("domain") as string,
    };

    try {
      // Search jobs first
      const jobResponse = await fetch("http://localhost:5000/api/v1/jobs/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!jobResponse.ok) {
        const errorText = await jobResponse.text();
        throw new Error(`Job search failed: ${errorText}`);
      }

      // Generate roadmap
      const roadmapResponse = await fetch("http://localhost:5000/api/v1/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!roadmapResponse.ok) {
        const errorText = await roadmapResponse.text();
        throw new Error(`Roadmap generation failed: ${errorText}`);
      }

      const html = await roadmapResponse.text();
      setRoadmapHtml(html);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (roadmapHtml) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Roadmap</h2>
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Close
            </button>
          </div>
          <div
            className="p-4 overflow-auto max-h-[calc(90vh-80px)]"
            dangerouslySetInnerHTML={{ __html: roadmapHtml }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Generate Roadmap</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="college"
            placeholder="College"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="currentYear"
            type="number"
            placeholder="Current Year"
            className="w-full p-2 border rounded"
            defaultValue="2024"
            required
          />
          <input
            name="gradYear"
            type="number"
            placeholder="Graduation Year"
            className="w-full p-2 border rounded"
            defaultValue="2025"
            required
          />
          <textarea
            name="currentSkills"
            placeholder="Current Skills (comma-separated)"
            className="w-full p-2 border rounded h-20"
            required
          />
          <textarea
            name="targetSkills"
            placeholder="Target Skills (comma-separated)"
            className="w-full p-2 border rounded h-20"
            required
          />
          <input
            name="domain"
            placeholder="Interested Domain"
            className="w-full p-2 border rounded"
            required
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
