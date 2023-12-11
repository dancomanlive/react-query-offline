// Utility function to format timestamp
export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
