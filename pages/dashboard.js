import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ASMECalculatorTab from "../components/ASMECalculatorTab";
// import CriteriaTab from "../components/CriteriaTab";
// import CorrosionRateTab from "../components/CorrosionRateTab";
// import CorrosionFullTab from "../components/CorrosionFullTab";
// import FluidSelectorTab from "../components/FluidSelectorTab";
// import InventoryTab from "../components/InventoryTab";
import RemainingLifeTab from "../components/RemainingLifeTab";
import InspectionConfidenceTab from "../components/InspectionConfidenceTab";
import ToxicCalculationTab from "../components/ToxicCalculationTab";
import CorrosionCalculationTab from "../components/CorrosionCalculationTab";
import CofCalculatorTab from "../components/CofCalculatorTab";
import QpofCalculatorTab from "../components/QpofCalculatorTab";
import CrackingMechanismTab from "../components/CrackingMechanismTab";
import BkStressTab from "../components/BkStressTab";
import ASMEB31_3Tab from "../components/ASMEB31_3Tab";

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "ASMESECTIONVIIIDIV1":
        return <ASMECalculatorTab />;
      /*
      case "CRITERIA_OF_FINDING":
        return <CriteriaTab />;
      case "CORROSION_RATE_ESTIMATOR":
        return <CorrosionRateTab />;
      case "CORROSION_FULL":
        return <CorrosionFullTab />;
      case "FLUID_SELECTOR":
        return <FluidSelectorTab />;
      case "INVENTORY_CALCULATOR":
        return <InventoryTab />;
      */
      case "REMAINING_LIFE":
        return <RemainingLifeTab />;
      case "INSPECTION_CONFIDENCE":
        return <InspectionConfidenceTab />;
      case "TOXIC_CALCULATION":
        return <ToxicCalculationTab />;
      case "CORROSION_CALCULATION":
        return <CorrosionCalculationTab />;
      case "COF_CALCULATOR":
        return <CofCalculatorTab />;
      case "QPOF_CALCULATOR":
        return <QpofCalculatorTab />;
      case "CRACKING_MECHANISM":
        return <CrackingMechanismTab />;
      case "BK_STRESS":
        return <BkStressTab />;
      case "ASMEB31_3":
        return <ASMEB31_3Tab />;
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
                  {getTabDisplayName(tab)}
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

// Helper function to convert tab keys to readable names
function getTabDisplayName(tabKey) {
  const map = {
    ASMESECTIONVIIIDIV1: "ASME Section VIII Div 1",
    CRITERIA_OF_FINDING: "Criteria of Finding Damage Mechanism",
    CORROSION_RATE_ESTIMATOR: "Damage Mechanism – Corrosion Rate Estimator",
    CORROSION_FULL: "Corrosion Full Analysis",
    FLUID_SELECTOR: "Representative Fluid",
    INVENTORY_CALCULATOR: "Inventory Calculator",
    REMAINING_LIFE: "Remaining Life",
    INSPECTION_CONFIDENCE: "Inspection Confidence",
    TOXIC_CALCULATION: "Toxic % Calculation",
    CORROSION_CALCULATION: "Risk Calculator (Corrosion)",
    COF_CALCULATOR: "Risk Calculator COF",
    QPOF_CALCULATOR: "Risk Calculator POF",
    CRACKING_MECHANISM: "Cracking Mechanism Finder",
    BK_STRESS: "Stress Value",
    ASMEB31_3: "ASME B31.3 Process Piping",
  };
  return map[tabKey] || tabKey;
}
