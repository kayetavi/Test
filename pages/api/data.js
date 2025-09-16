import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "UID missing" });
    }

    const docRef = doc(db, "users_roles", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    const role = docSnap.data()?.role || "";

    if (role === "admin") {
      return res.status(200).json({ data: "This is secure admin data" });
    } else {
      return res.status(403).json({ error: "Unauthorized" });
    }

  } catch (err) {
    console.error("Error in API:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
