import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase-config";

// Import all tab components
import ASMECalculatorTab from "../components/ASMECalculatorTab";
import InventoryCalculatorTab from "../components/InventoryCalculatorTab";
import ProcessPipingCalculator from "../components/ProcessPipingCalculator";
/*
import ThicknessMonitoringTab from "../components/ThicknessMonitoringTab";
import FAAReleaseRateTab from "../components/FAAReleaseRateTab";
import InventoryCalculatorTab from "../components/InventoryCalculatorTab";

import CorrosionCalculationTab from "../components/CorrosionCalculationTab";
import ToxicCalculationTab from "../components/ToxicCalculationTab";
import RemainingLifeTab from "../components/RemainingLifeTab";
import InspectionConfidenceTab from "../components/InspectionConfidenceTab";
import CofCalculatorTab from "../components/CofCalculatorTab";
import QPofCalculatorTab from "../components/QPofCalculatorTab";
import CrackingMechanismTab from "../components/CrackingMechanismTab";
import StressMaterialTab from "../components/StressMaterialTab";
import ASMEB31_3Tab from "../components/ASMEB31_3Tab";
*/

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

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "ASMESECTIONVIIIDIV1":
        return <ASMECalculatorTab />;
           case "INVENTORY_CALCULATOR":
        return <InventoryCalculatorTab />;
          case "PROCESS_PIPING":
        return <ProcessPipingCalculator />;
      /*
      case "THICKNESSMONITORING":
        return <ThicknessMonitoringTab />;
      case "FAA_RELEASE_RATE":
        return <FAAReleaseRateTab />;
      case "INVENTORY_CALCULATOR":
        return <InventoryCalculatorTab />;
      
      case "CORROSION_CALCULATION":
        return <CorrosionCalculationTab />;
      case "TOXIC_CALCULATION":
        return <ToxicCalculationTab />;
      case "REMAINING_LIFE":
        return <RemainingLifeTab />;
      case "INSPECTION_CONFIDENCE":
        return <InspectionConfidenceTab />;
      case "COF_CALCULATOR":
        return <CofCalculatorTab />;
      case "QPOF_CALCULATOR":
        return <QPofCalculatorTab />;
      case "CRACKING_MECHANISM":
        return <CrackingMechanismTab />;
      case "STRESS_MATERIAL":
        return <StressMaterialTab />;
      case "ASMEB31_3":
        return <ASMEB31_3Tab />;
      */
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
                  {tab.replace(/_/g, " ")}
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
