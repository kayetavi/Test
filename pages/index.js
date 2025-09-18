import { useState } from "react";
import { auth, db } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

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
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />

          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>

      {/* ✅ Embedded CSS */}
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #4f46e5, #3b82f6);
          font-family: Arial, sans-serif;
        }

        .login-card {
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .login-title {
          margin-bottom: 20px;
          font-size: 28px;
          font-weight: bold;
          color: #1e293b;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .login-input {
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: border 0.2s;
        }
        .login-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
        }

        .login-button {
          padding: 12px;
          background: #3b82f6;
          color: white;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .login-button:hover {
          background: #2563eb;
        }
        .login-button:disabled {
          background: #93c5fd;
          cursor: not-allowed;
        }

        .error-message {
          margin-top: 15px;
          color: #dc2626;
          font-size: 14px;
        }

        .signup-text {
          margin-top: 20px;
          font-size: 14px;
          color: #475569;
        }
        .signup-text a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }
        .signup-text a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
