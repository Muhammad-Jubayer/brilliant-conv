import { getDatabase, ref, set } from "firebase/database";

import { useEffect } from "react";

export default function useSet(path, data) {
  useEffect(() => {
    const db = getDatabase();
    const pathRef = ref(db, path);
    set(pathRef, data);
  });
}
