import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, set, push } from "firebase/database";

const uploadImageToFirebase = (file, uploadTo, linkSetTo) => {
  const storage = getStorage();
  const storageRef = ref(storage, uploadTo);

  uploadBytes(storageRef, file)
    .then(() => {
      getDownloadURL(storageRef)
        .then((url) => {
          const db = getDatabase();
          const pathRef = dbRef(db, linkSetTo);
          set(pathRef, url);
        })

        .catch((error) => console.log(error));
    })

    .catch((error) => console.log(error));
};

export function setData(path, data) {
  try {
    const db = getDatabase();
    const pathRef = dbRef(db, path);
    set(pathRef, data);
  } catch (e) {
    console.log(e);
  }
}

const pushData = (path, data) => {
  const db = getDatabase();
  const msgRef = dbRef(db, path);
  const newMsgRef = push(msgRef);

  set(newMsgRef, data);
};

export { uploadImageToFirebase, pushData };
