import { useState } from "react";
import { auth, db } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // optional loading state
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous error
    setLoading(true);

    try {
      // 1️⃣ Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 2️⃣ Fetch user role and allowed tabs from Firestore
      const docRef = doc(db, "users_roles", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const role = data?.role || "";
        const allowedTabs = Array.isArray(data?.allowedTabs) ? data.allowedTabs : [];

        if (!role || !allowedTabs.length) {
          setError("User role or allowed tabs not properly set in Firestore.");
          setLoading(false);
          return;
        }

        // 3️⃣ Save data in localStorage
        try {
          localStorage.setItem("userUid", uid);
          localStorage.setItem("userRole", role);
          localStorage.setItem("allowedTabs", JSON.stringify(allowedTabs));
        } catch (err) {
          console.error("Error saving to localStorage:", err);
          setError("Failed to save user data locally.");
          setLoading(false);
          return;
        }

        // 4️⃣ Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError("User role not found in Firestore.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
