export const getImageURI = (path) => {
  // Fast exit
  if (!path || typeof path !== "string") return "";

  // If already absolute URL → return as-is
  if (path.startsWith("http") || path.startsWith("https")) {
    return path;
  }

  const base = import.meta.env.VITE_S3_IMAGE_URL;
  // Ensure single slash between base and path
  return `${base}/${path.replace(/^\/+/, "")}`;
};
