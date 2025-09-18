import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

import ASMECalculatorTab from "../components/ASMECalculatorTab";
import ProcessPipingCalculator from "../components/ProcessPipingCalculator"; // ✅ Import your new component
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [allowedTabs, setAllowedTabs] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("");
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

    setRole(storedRole);
    setAllowedTabs(storedTabs);
    setUserEmail(email);

    if (storedTabs.length > 0) setActiveTab(storedTabs[0]);

    setLoading(false);
  }, [router]);

  if (loading) return <p>Loading...</p>;

  // ✅ Add readable labels for tabs
  const tabLabels = {
    ASMESECTIONVIIIDIV1: "ASME Section VIII Div 1",
    PROCESS_PIPING_THICKNESS: "Process Piping Calculator",
    // Add more labels here if you add more tabs
  };

  // ✅ Add support for rendering the new tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "ASMESECTIONVIIIDIV1":
        return <ASMECalculatorTab />;
      case "PROCESS_PIPING_THICKNESS":
        return <ProcessPipingCalculator />;
      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <header className={styles.header}>
        Welcome{" "}
        <span className={styles.userEmail}>
          {userEmail ? userEmail.split("@")[0] : "User"}
        </span>
        ! Risk Based Inspection Dashboard
      </header>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h3>Features</h3>
          <ul className={styles.featuresList}>
            {allowedTabs.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`${styles.tabButton} ${
                    activeTab === tab ? styles.tabButtonActive : ""
                  }`}
                >
                  {tabLabels[tab] || tab}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Panel */}
        <main className={styles.mainPanel}>{renderTabContent()}</main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        © 2025 | Created by Avijit Kayet | About | Privacy Policy | Contact
      </footer>
    </div>
  );
}
