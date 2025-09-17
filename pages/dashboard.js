import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

import ASMECalculatorTab from "../components/ASMECalculatorTab";
// Import other tab components similarly...

import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [allowedTabs, setAllowedTabs] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);

  // For dropdown show/hide
  const [settingsDropdownVisible, setSettingsDropdownVisible] = useState(false);

  // For expanded categories (store expanded category keys)
  const [expandedCategories, setExpandedCategories] = useState({});

  // For modal visibility
  const [modalVisible, setModalVisible] = useState({
    cduVdu: false,
    processFlow: false,
    msp: false,
    h2u: false,
  });

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

  // Click outside dropdown to close
  useEffect(() => {
    function handleClickOutside() {
      if (settingsDropdownVisible) setSettingsDropdownVisible(false);
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [settingsDropdownVisible]);

  if (loading) return <p>Loading...</p>;

  // Helper to toggle category/subcategory expansion
  function toggleCategory(key) {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  // Hide welcome panel: we can simulate by no special "welcome" div, or keep a flag for it if needed

  // Show/hide modals (example)
  function openModal(name) {
    setModalVisible((prev) => ({
      cduVdu: false,
      processFlow: false,
      msp: false,
      h2u: false,
      [name]: true,
    }));
    setActiveTab(""); // clear active tab when modal opens
  }

  function closeModal(name) {
    setModalVisible((prev) => ({
      ...prev,
      [name]: false,
    }));
  }

  // Map of tab name => render function/component
  const tabContentMap = {
    ASMESECTIONVIIIDIV1: <ASMECalculatorTab />,
    // Add other tab components here:
    // CRITERIA: <CriteriaTab />,
    // CORROSION_RATE: <CorrosionRateTab />,
    // etc...
  };

  // Sidebar categories as React data with nested structure
  const categories = [
    {
      key: "api581",
      label: "Risk-Based Inspection Methodology",
      mechanisms: [
        { key: "criteria", label: "Criteria of Finding Damage Mechanism", tab: "CRITERIA" },
        { key: "corrosionFull", label: "Damage Mechanism – Corrosion Rate Estimator", tab: "CORROSION_FULL" },
        { key: "fluidSelector", label: "Representative Fluid", tab: "FLUID_SELECTOR" },
        { key: "inventory", label: "Inventory Calculator", tab: "INVENTORY" },
        { key: "inspectionConfidence", label: "Inspection Confidence", tab: "INSPECTION_CONFIDENCE" },
        { key: "toxicCalculation", label: "Toxic % Calculation", tab: "TOXIC_CALCULATION" },
        {
          key: "quantitative",
          label: "Quantitative",
          subMechanisms: [
            { key: "cofCalculator", label: "Risk Calculator_COF", tab: "COF_CALCULATOR" },
            { key: "qpofCalculator", label: "Risk Calculator_POF", tab: "QPOF_CALCULATOR" },
          ],
        },
        {
          key: "semiQuantitative",
          label: "Semi Quantitative",
          subMechanisms: [
            { key: "corrosionCalculation", label: "Risk Calculator", tab: "CORROSION_CALCULATION" },
          ],
        },
      ],
    },
    {
      key: "api570",
      label: "Thickness Data Evaluation & Analysis",
      mechanisms: [
        { key: "remainingLife", label: "Statistical Analysis", tab: "REMAINING_LIFE" },
      ],
    },
    {
      key: "designThicknessCalculator",
      label: "Design Thickness Calculator",
      mechanisms: [
        { key: "processPiping", label: "Process Piping", tab: "ASMEB31_3" },
        { key: "pressureVessel", label: "Pressure Vessel", tab: "ASMESECTIONVIIIDIV1" },
      ],
    },
    {
      key: "crackingMechanism",
      label: "Cracking Mechanism Finder",
      mechanisms: [
        { key: "openFinder", label: "Open Finder", tab: "CRACKING_MECHANISM" },
      ],
    },
    {
      key: "stressMaterialData",
      label: "Stress & Material Data",
      mechanisms: [
        { key: "stressValue", label: "Stress value", tab: "BK_STRESS" },
      ],
    },
    {
      key: "processFlowDiagrams",
      label: "Corrosion Diagrams",
      mechanisms: [
        { key: "hydroprocessing", label: "HYDROPROCESSING", modal: "processFlow" },
        { key: "cduVdu", label: "CDU / VDU", modal: "cduVdu" },
        { key: "msp", label: "MSP", modal: "msp" },
        { key: "h2u", label: "H2U", modal: "h2u" },
      ],
    },
  ];

  // When clicking mechanism:
  // If it has modal, open modal; else set active tab

  function onMechanismClick(mech) {
    if (mech.modal) {
      openModal(mech.modal);
    } else {
      setActiveTab(mech.tab);
      // close all modals
      setModalVisible({
        cduVdu: false,
        processFlow: false,
        msp: false,
        h2u: false,
      });
    }
  }

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <header className={styles.header}>
        Welcome{" "}
        <span className={styles.userEmail}>
          {userEmail ? userEmail.split("@")[0] : "User"}
        </span>
        ! Risk Based Inspection Dashboard

        <button
          id="settingsBtn"
          onClick={(e) => {
            e.stopPropagation();
            setSettingsDropdownVisible(!settingsDropdownVisible);
          }}
          className={styles.settingsButton}
        >
          Settings
        </button>

        {settingsDropdownVisible && (
          <div id="dropdownContent" className={styles.dropdownContent}>
            <p>Settings option 1</p>
            <p>Settings option 2</p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h3>Features</h3>

          <ul className={styles.categoryList} id="categoryList">
            {categories.map(({ key, label, mechanisms }) => (
              <li key={key}>
                <span
                  className={styles.category}
                  onClick={() => toggleCategory(key)}
                  style={{ cursor: "pointer" }}
                >
                  {label}
                </span>
                {expandedCategories[key] && (
                  <ul className={styles.mechanisms}>
                    {mechanisms.map((mech) =>
                      mech.subMechanisms ? (
                        <li key={mech.key}>
                          <span
                            className={styles.subcategory}
                            onClick={() => toggleCategory(mech.key)}
                            style={{ cursor: "pointer" }}
                          >
                            {mech.label}
                          </span>
                          {expandedCategories[mech.key] && (
                            <ul className={styles.mechanisms}>
                              {mech.subMechanisms.map((subMech) => (
                                <li key={subMech.key}>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onMechanismClick(subMech);
                                    }}
                                  >
                                    {subMech.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li key={mech.key}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              onMechanismClick(mech);
                            }}
                          >
                            {mech.label}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Panel */}
        <main className={styles.mainPanel}>
          {/* Render tab content based on activeTab */}
          {activeTab ? (
            tabContentMap[activeTab] || (
              <p>No content available for this tab yet.</p>
            )
          ) : (
            <p>Select a tab to view content.</p>
          )}
        </main>
      </div>

      {/* Modals */}
      {modalVisible.cduVdu && (
        <div className={styles.modal}>
          <button onClick={() => closeModal("cduVdu")}>Close CDU/VDU Modal</button>
          {/* Modal content and initCDUVDU() logic here */}
        </div>
      )}
      {modalVisible.processFlow && (
        <div className={styles.modal}>
          <button onClick={() => closeModal("processFlow")}>Close Process Flow Modal</button>
          {/* Modal content */}
        </div>
      )}
      {modalVisible.msp && (
        <div className={styles.modal}>
          <button onClick={() => closeModal("msp")}>Close MSP Modal</button>
          {/* Modal content */}
        </div>
      )}
      {modalVisible.h2u && (
        <div className={styles.modal}>
          <button onClick={() => closeModal("h2u")}>Close H2U Modal</button>
          {/* Modal content */}
        </div>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        © 2025 | Created by Avijit Kayet | About | Privacy Policy | Contact
      </footer>
    </div>
  );
}
