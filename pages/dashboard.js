import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [allowedTabs, setAllowedTabs] = useState([]);
  const [tabData, setTabData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedTabs = JSON.parse(localStorage.getItem("allowedTabs") || "[]");
    const userUid = localStorage.getItem("userUid");

    if (!storedRole || !storedTabs.length || !userUid) {
      router.push("/");
      return;
    }

    setRole(storedRole);
    setAllowedTabs(storedTabs);

    const fetchTabData = async () => {
      const querySnapshot = await getDocs(collection(db, "tabs_data"));
      let filteredData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (storedTabs.includes(data.tabName)) {
          filteredData.push(data);
        }
      });

      setTabData(filteredData);
    };

    fetchTabData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <h2>Welcome, {role === "admin" ? "Admin" : "User"}!</h2>

      <h3>Accessible Tabs:</h3>
      <ul>
        {allowedTabs.map((tab, idx) => (
          <li key={idx}><strong>{tab}</strong></li>
        ))}
      </ul>

      <h3>Tab Data:</h3>
      {tabData.length ? (
        tabData.map((tab, idx) => (
          <div key={idx} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h4>{tab.tabName}</h4>
            <p>{tab.description}</p>
          </div>
        ))
      ) : (
        <p>No tab data available for your role.</p>
      )}
    </div>
  );
        }
