import { useEffect } from "react";
import { useState } from "react";
// import Feeds from "./../Feeds";

export default function Home() {
  const [serverData, setServerData] = useState("");
  useEffect(() => {
    fetch("/")
      .then((response) => response.json())
      .then((data) => setServerData(data));
  });
  return (
    <div>{serverData ? <ul>{serverData}</ul> : <p>Loading data...</p>}</div>
  );
}
