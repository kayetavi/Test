import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "";
    const storedTabs = JSON.parse(localStorage.getItem("allowedTabs") || "[]");
    const userUid = localStorage.getItem("userUid") || "";
    const email = localStorage.getItem("userEmail") || "";

    // If not logged in or incomplete info, redirect to login
    if (!storedRole || storedTabs.length === 0 || !userUid) {
      router.push("/");
      return;
    }

    // Optionally expose user data to window/global if needed by legacy JS
    window.userData = {
      role: storedRole,
      allowedTabs: storedTabs,
      email,
      uid: userUid,
    };

    setLoading(false);
  }, [router]);

  // Inject legacy script (includes full UI design & logic)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "/scripts/legacy-dashboard.js";
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return null; // No design, layout handled by HTML + JS
}
