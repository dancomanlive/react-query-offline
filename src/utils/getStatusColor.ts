// Utility function to determine status color
export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "purple";
    case "success":
      return "green";
    default:
      return "black"; // Default color for other statuses
  }
};
