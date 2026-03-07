import { useState } from "react";
import {ArrowLeft, UploadCloud, Plus } from "lucide-react";

export default function AddBuilder() {
  const [expertise] = useState(["Residential", "Commercial"]);
  const [reasons] = useState(["On-time Delivery"]);
  const [standards] = useState(["ISO 9001", "Eco Friendly"]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b bg-white">
        <ArrowLeft className="cursor-pointer" size={20} />
        <h1 className="text-xl font-semibold text-gray-800">
          Add Builder
        </h1>
      </div>
      <div className="max-w-7xl px-6 py-8 space-y-10">
        {/* BUILDER IDENTITY */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Builder Identity
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Company Name *</label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-2"
                placeholder="e.g. Skyline Constructions Ltd."
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Registration Number *
              </label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-2"
                placeholder="e.g. REG-2024-88392"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Date of Registration
              </label>
              <input
                type="date"
                className="mt-2 w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Experience (Years)</label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-2"
                placeholder="e.g. 12"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Website URL</label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-2"
                placeholder="https://"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Builder Logo</label>

              <div className="mt-2 border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                <UploadCloud size={22} />
                <p className="text-sm mt-1">Click to upload or drag and drop</p>
                <p className="text-xs">SVG, PNG, JPG or GIF (max. 2MB)</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT INFORMATION */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium">Contact Person *</label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-2"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Contact Number *</label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-2"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email Address *</label>
              <input
                className="mt-2 w-full border rounded-lg px-4 py-2"
                placeholder="contact@company.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Office Address</label>
            <textarea
              className="mt-2 w-full border rounded-lg px-4 py-3"
              placeholder="Enter complete office address"
            />
          </div>
        </section>

        {/* PROFILE CONTENT */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Content
          </h2>

          <div>
            <label className="text-sm font-medium">About Builder</label>
            <textarea
              className="mt-2 w-full border rounded-lg px-4 py-3"
              placeholder="Write a brief description about the builder..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Vision</label>
              <textarea
                className="mt-2 w-full border rounded-lg px-4 py-3"
                placeholder="Company vision statement..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Mission</label>
              <textarea
                className="mt-2 w-full border rounded-lg px-4 py-3"
                placeholder="Company mission statement..."
              />
            </div>
          </div>
        </section>

        {/* EXPERTISE */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Expertise & Highlights
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Expertise */}
            <div>
              <label className="text-sm font-medium">Areas of Expertise</label>

              <div className="flex flex-wrap gap-2 mt-3">
                {expertise.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-3 flex items-center gap-1 text-sm text-purple-600">
                <Plus size={14} /> Add Tag
              </button>
            </div>

            {/* Why Choose */}
            <div>
              <label className="text-sm font-medium">Why Choose Us</label>

              <div className="flex flex-wrap gap-2 mt-3">
                {reasons.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-3 flex items-center gap-1 text-sm text-purple-600">
                <Plus size={14} /> Add Reason
              </button>
            </div>

            {/* Standards */}
            <div>
              <label className="text-sm font-medium">Quality & Standards</label>

              <div className="flex flex-wrap gap-2 mt-3">
                {standards.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-3 flex items-center gap-1 text-sm text-purple-600">
                <Plus size={14} /> Add Standard
              </button>
            </div>
          </div>
        </section>

        {/* NETWORK SETTINGS */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Network Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Builder Status</label>
              <select className="mt-2 w-full border rounded-lg px-4 py-2">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <p className="font-medium">Visibility</p>
                <p className="text-sm text-gray-500">Visible in Network</p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
          </div>

          <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <p className="font-medium">Permissions</p>
              <p className="text-sm text-gray-500">Allow Builder Posts</p>
            </div>
            <input type="checkbox" />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t bg-white px-6 py-4 flex justify-between items-center">
        <button className="px-6 py-2 rounded-lg border bg-gray-100">
          Cancel
        </button>

        <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow">
          ✓ Save Builder
        </button>
      </div>
    </div>
  );
}
