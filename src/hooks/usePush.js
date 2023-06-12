import { getDatabase, ref, set } from "firebase/database";

export default function useFetch(path, data) {
  function pushData() {
    const db = getDatabase();
    const pathRef = ref(db, path);
    set(pathRef, data);
  }

  pushData();
}
