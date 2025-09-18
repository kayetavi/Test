import { useState } from "react";
import { auth, db } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

// ✅ Import CSS module
import styles from "../styles/Login.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

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

        localStorage.setItem("userUid", uid);
        localStorage.setItem("userRole", role);
        localStorage.setItem("allowedTabs", JSON.stringify(allowedTabs));
        localStorage.setItem("userEmail", userCredential.user.email);

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
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <h1 className={styles["login-title"]}>Login</h1>

        <form onSubmit={handleLogin} className={styles["login-form"]}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles["login-input"]}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles["login-input"]}
          />

          <button
            type="submit"
            disabled={loading}
            className={styles["login-button"]}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className={styles["error-message"]}>{error}</p>}

        <p className={styles["signup-text"]}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
