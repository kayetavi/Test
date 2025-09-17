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

    if (!storedRole || storedTabs.length === 0 || !userUid) {
      router.push("/");
      return;
    }

    window.userData = {
      role: storedRole,
      allowedTabs: storedTabs,
      email,
      uid: userUid,
    };

    setLoading(false);
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <iframe
      src="public/dashboard.html"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
      title="Dashboard"
    />
  );
}
