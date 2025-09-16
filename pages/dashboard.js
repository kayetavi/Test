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

    if (!storedRole || !storedTabs.length || !userUid) {
      router.push("/");
      return;
    }

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

    // ✅ Admin tabs setup (only client-side)
    if (storedRole === "admin" && typeof window !== "undefined") {
      // Example: attach all tab functions to window
      window.hideWelcomePanel = () => {
        const panel = document.getElementById("welcomePanel");
        if (panel) panel.style.display = "none";
      };

      window.toggleCategory = (element) => {
        const ul = element.nextElementSibling;
        const isExpanded = ul.style.display === "block";
        ul.style.display = isExpanded ? "none" : "block";

        if (isExpanded) {
          const welcome = document.getElementById("welcomePanel");
          if (welcome) welcome.style.display = "block";
        }
      };

      // Add all tabs functions
      window.showCriteriaTab = () => {
        document.querySelectorAll(".tab-content").forEach((t) => (t.style.display = "none"));
        const tab = document.getElementById("criteriaTab");
        if (tab) tab.style.display = "block";
        const title = document.getElementById("selectedMechanismTitle");
        if (title) title.style.display = "none";
        window.hideWelcomePanel();
      };

      window.showCorrosionTab = () => {
        document.querySelectorAll(".tab-content").forEach((t) => (t.style.display = "none"));
        const tab = document.getElementById("corrosionRateTab");
        if (tab) tab.style.display = "block";
        const title = document.getElementById("selectedMechanismTitle");
        if (title) title.style.display = "none";
        window.hideWelcomePanel();
      };

      // ✅ Add remaining admin tabs functions similarly
      // showCorrosionFullTab, showFluidSelectorTab, showInventoryTab, showRemainingLifeTab
      // showINSPECTIONCONFIDENCETab, showASMEB31_3Tab, showASMESECTIONVIIIDIV1Tab
      // showTOXIC_CALCULATIONTab, showCORROSION_CALCULATIONTab, showcof_calculatorTab
      // showQPOF_calculatorTab, showCrackingMechanismTab, showbkStressTab
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
