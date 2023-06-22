export const formatTimestamp = (timestamp) => {
  // Create a new Date object based on the timestamp
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  // Format the date with AM/PM indication
  const formattedDate = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedDate;
};
