import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

export default function useFetch(path) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function fetchData() {
    const db = getDatabase();
    const pathRef = ref(db, path);
    onValue(pathRef, (snapshot) => {
      const data = snapshot.val();
      setResult(data);
    });
  }

  return result;
}
