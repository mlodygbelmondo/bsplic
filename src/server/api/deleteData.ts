import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export default async function deleteData(collection: string, id: string) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await deleteDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
