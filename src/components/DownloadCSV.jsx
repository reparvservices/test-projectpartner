import React from "react";
import { FiDownload } from "react-icons/fi";

const DownloadCSV = ({ data, filename }) => {
  const handleDownload = () => {
    downloadCSV(data, filename);
  };

  const downloadCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(",") + "\n";
    const rows = data.map((obj) => Object.values(obj).join(",")).join("\n");
    const csvContent = headers + rows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 border px-4 h-10 rounded-lg text-sm hover:bg-gray-50"
    >
      <FiDownload /> Download
    </button>
  );
};

export default DownloadCSV;
