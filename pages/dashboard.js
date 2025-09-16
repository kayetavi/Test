import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [allowedTabs, setAllowedTabs] = useState([]);
  const [tabData, setTabData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "";
    const userUid = localStorage.getItem("userUid") || "";
    let storedTabs = [];

    try {
      storedTabs = JSON.parse(localStorage.getItem("allowedTabs") || "[]");
    } catch (err) {
      storedTabs = [];
    }

    // Redirect if essential data missing
    if (!storedRole || !storedTabs.length || !userUid) {
      router.push("/");
      return;
    } 0

    setRole(storedRole);
    setAllowedTabs(storedTabs);

    const fetchTabData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tabs_data"));
        const filteredData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (storedTabs.includes(data?.tabName)) {
            filteredData.push(data);
          }
        });

        setTabData(filteredData);
      } catch (err) {
        console.error("Error fetching tab data:", err);
        setTabData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTabData();

    // ✅ Load admin tabs JS dynamically for admin role
    if (storedRole === "admin") {
      const script = document.createElement("script");
      script.src = "/adminTabs.js";
      script.async = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <h2>Welcome, {role ? (role === "admin" ? "Admin" : "User") : "Guest"}!</h2>

      <h3>Accessible Tabs:</h3>
      <ul>
        {allowedTabs?.length > 0 ? (
          allowedTabs.map((tab, idx) => <li key={idx}><strong>{tab}</strong></li>)
        ) : (
          <li>No accessible tabs</li>
        )}
      </ul>

      <h3>Tab Data:</h3>
      {tabData?.length > 0 ? (
        tabData.map((tab, idx) => (
          <div key={idx} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h4>{tab?.tabName || "No Name"}</h4>
            <p>{tab?.description || "No Description"}</p>
          </div>
        ))
      ) : (
        <p>No tab data available for your role.</p>
      )}
    </div>
  );
}
