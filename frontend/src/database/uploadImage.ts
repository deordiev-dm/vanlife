import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/database/firebase";

export default function uploadImage(
  image: Blob,
  name: string,
): Promise<string> {
  return new Promise((res, rej) => {
    const storageRef = ref(storage, `vans/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed", // event type
      null, // progress can be tracked here
      (err) => {
        console.error("Image upload failed:", err);
        rej(err);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          res(downloadURL);
        } catch (err) {
          rej(err);
        }
      },
    );
  });
}
