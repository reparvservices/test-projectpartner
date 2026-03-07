import React from "react";
import { ArrowLeft, User, MapPin, Gift, Settings, Upload } from "lucide-react";

export default function AddTerritoryPartner() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b bg-white">
        <ArrowLeft className="cursor-pointer" />
        <h1 className="text-xl font-semibold">Add Territory Partners</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 max-w-7xl w-full space-y-8">

        {/* Partner Basic Information */}
        <Section title="Partner Basic Information" icon={<User size={18}/>}>
          <div className="grid md:grid-cols-2 gap-6">

            <Input label="Full Name" placeholder="e.g. Michael Chen" required />
            <Input label="Contact Number" placeholder="+1 (555) 000-0000" required />

            <Input label="Email Address" placeholder="michael@example.com" required />

            <div>
              <Label>Profile Photo</Label>
              <div className="border border-dashed rounded-lg p-6 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50">
                <Upload size={16} className="mr-2" />
                Upload profile photo...
              </div>
            </div>

          </div>
        </Section>

        {/* Location Details */}
        <Section title="Location Details" icon={<MapPin size={18}/>}>
          <div className="grid md:grid-cols-2 gap-6">

            <Select label="State" required>
              <option>Select State</option>
            </Select>

            <Select label="City" required>
              <option>Select City</option>
            </Select>

            <Input label="Service Area / Territory" placeholder="e.g. Greater Bay Area" />

            <Select label="Preferred Property Type">
              <option>Select Type</option>
            </Select>

          </div>
        </Section>

        {/* Partner Intent */}
        <Section title="Partner Intent and Background" icon={<Gift size={18}/>}>
          <div className="grid md:grid-cols-2 gap-6">

            <div className="md:col-span-2">
              <Label required>Why are You Interested?</Label>
              <textarea
                className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
                placeholder="Describe your interest in joining the network..."
              />
            </div>

            <Input label="Years of Experience" placeholder="e.g. 5" />
            <Input label="Previous Brokerage" placeholder="e.g. Century Real Estate" />

            <div className="md:col-span-2">
              <Label>Short Bio</Label>
              <textarea
                className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
                placeholder="Professional biography..."
              />
            </div>

          </div>
        </Section>

        {/* Network Settings */}
        <Section title="Network Settings" icon={<Settings size={18}/>}>
          <div className="grid md:grid-cols-2 gap-6">

            <Select label="Partner Status">
              <option>Active</option>
              <option>Inactive</option>
            </Select>

            <div className="flex items-center justify-between border rounded-lg px-4 py-3">
              <span>Commission Agreement</span>
              <input type="checkbox" defaultChecked />
            </div>

            <Toggle label="Lead Sharing" />

            <Toggle label="Network Visibility" defaultChecked />

          </div>
        </Section>

      </div>

      {/* Footer */}
      <div className="border-t bg-white p-4 flex justify-between items-center">

        <button className="px-6 py-2 border rounded-lg bg-gray-100">
          Cancel
        </button>

        <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow">
          ✓ Save Sales Partner
        </button>

      </div>

    </div>
  );
}


/* ---------- UI Components ---------- */

function Section({ title, icon, children }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-2 font-semibold mb-6 text-gray-700">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium mb-2">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function Input({ label, placeholder, required }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input
        className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={placeholder}
      />
    </div>
  );
}

function Select({ label, children, required }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <select className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-purple-500">
        {children}
      </select>
    </div>
  );
}

function Toggle({ label, defaultChecked }) {
  return (
    <div className="flex items-center justify-between border rounded-lg px-4 py-3">
      <span>{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} />
    </div>
  );
}