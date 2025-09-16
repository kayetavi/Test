import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

export default async function handler(req, res) {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "UID missing" });
  }

  const docRef = doc(db, "users_roles", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const role = docSnap.data().role;

    if (role === "admin") {
      res.status(200).json({ data: "This is secure admin data" });
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  } else {
    res.status(404).json({ error: "User not found" });
  }
}
