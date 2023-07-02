import { getDatabase, ref, set } from "firebase/database";
import clipboardy from "clipboardy";

export function copyText(text) {
  clipboardy.writeSync(text);
  console.log('Text copied to clipboard');
}

export default function formatTimestamp(timestamp) {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  // Time difference in milliseconds
  const timeDiff = currentDate.getTime() - targetDate.getTime();

  // Time difference in days
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Helper function to format time with AM/PM
  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert to 12-hour format
    minutes = minutes.toString().padStart(2, "0");

    return `${hours}:${minutes} ${amPm}`;
  }

  if (daysDiff < 0) {
    // Future timestamp
    return "Invalid timestamp";
  } else if (daysDiff === 0) {
    // Today
    return `Today at ${formatTime(targetDate)}`;
  } else if (daysDiff === 1) {
    // Yesterday
    return `Yesterday at ${formatTime(targetDate)}`;
  } else if (daysDiff <= 7) {
    // Within a week
    const day = targetDate.toLocaleString("en-US", { weekday: "long" });
    return `${day} at ${formatTime(targetDate)}`;
  } else if (currentDate.getFullYear() === targetDate.getFullYear()) {
    // Within the current year
    const month = targetDate.toLocaleString("en-US", { month: "short" });
    const date = targetDate.getDate();
    return `${month} ${date} at ${formatTime(targetDate)}`;
  } else {
    // Older than one year
    const formattedDate = targetDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return `${formattedDate} at ${formatTime(targetDate)}`;
  }
}


export function setData(path, data) {
try {
	
    const db = getDatabase();
    const pathRef = ref(db, path);
    set(pathRef, data);
    }
    catch (e) {
     console.log(e)	
    }
    
}

