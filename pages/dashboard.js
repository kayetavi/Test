import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

import ASMECalculatorTab from "../components/ASMECalculatorTab";
// import other tab components similarly...

import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [allowedTabs, setAllowedTabs] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);

  const [settingsDropdownVisible, setSettingsDropdownVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [modalVisible, setModalVisible] = useState({
    cduVdu: false,
    processFlow: false,
    msp: false,
    h2u: false,
  });

  const router = useRouter();

  useEffect(() => {
    async function fetchUserAccess() {
      const userUid = localStorage.getItem("userUid");
      if (!userUid) {
        router.push("/");
        return;
      }

      try {
        const docRef = doc(db, "users", userUid);
        const userDoc = await getDoc(docRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRole(userData.role || "");
          setAllowedTabs(userData.allowedTabs || []);
          setUserEmail(userData.email || "");

          const firstTab = (userData.allowedTabs || []).find((tab) =>
            Object.keys(tabContentMap).includes(tab)
          );
          if (firstTab) setActiveTab(firstTab);

          setLoading(false);
        } else {
          console.error("User doc not found");
          router.push("/");
        }
      } catch (err) {
        console.error("Error fetching user data", err);
        router.push("/");
      }
    }

    fetchUserAccess();
  }, [router]);

  useEffect(() => {
    function handleClickOutside() {
      if (settingsDropdownVisible) setSettingsDropdownVisible(false);
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [settingsDropdownVisible]);

  if (loading) return <p>Loading...</p>;

  function toggleCategory(key) {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function openModal(name) {
    setModalVisible({
      cduVdu: false,
      processFlow: false,
      msp: false,
      h2u: false,
      [name]: true,
    });
    setActiveTab(""); // close tab content when opening modal
  }

  function closeModal(name) {
    setModalVisible((prev) => ({
      ...prev,
      [name]: false,
    }));
  }

  function onMechanismClick(mech) {
    if (mech.modal) {
      openModal(mech.modal);
    } else {
      if (!allowedTabs.includes(mech.tab)) {
        alert("Access denied: You don’t have permission to access this feature.");
        return;
      }
      setActiveTab(mech.tab);
      setModalVisible({
        cduVdu: false,
        processFlow: false,
        msp: false,
        h2u: false,
      });
    }
  }

  const tabContentMap = {
    ASMESECTIONVIIIDIV1: <ASMECalculatorTab />,
    // Add your other tabs here:
    // CRITERIA: <CriteriaTab />,
    // CORROSION_FULL: <CorrosionRateTab />,
  };

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
      mechanisms: [{ key: "openFinder", label: "Open Finder", tab: "CRACKING_MECHANISM" }],
    },
    {
      key: "stressMaterialData",
      label: "Stress & Material Data",
      mechanisms: [{ key: "stressValue", label: "Stress value", tab: "BK_STRESS" }],
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

  return (
    <div className={styles.container}>
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

      <div className={styles.mainContent}>
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
                    {mechanisms
                      .filter((mech) => {
                        if (mech.subMechanisms) {
                          return mech.subMechanisms.some((sub) =>
                            allowedTabs.includes(sub.tab)
                          );
                        } else if (mech.tab) {
                          return allowedTabs.includes(mech.tab);
                        } else {
                          return true; // modal items
                        }
                      })
                      .map((mech) =>
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
                                {mech.subMechanisms
                                  .filter((sub) => allowedTabs.includes(sub.tab))
                                  .map((sub) => (
                                    <li key={sub.key}>
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          onMechanismClick(sub);
                                        }}
                                      >
                                        {sub.label}
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

        <main className={styles.mainPanel}>
          {activeTab ? (
            allowedTabs.includes(activeTab) ? (
              tabContentMap[activeTab] || <p>No content available for this tab yet.</p>
            ) : (
              <p>Access denied: You do not have access to this tab.</p>
            )
          ) : (
            <p>Select a tab or open a corrosion diagram.</p>
          )}
        </main>
      </div>

      {/* Modals */}
      {modalVisible.cduVdu && (
        <div className={styles.modal}>
          <button onClick={() => closeModal("cduVdu")}>Close CDU/VDU Modal</button>
        </div>
      )}
      {modalVisible.processFlow && (
        <div className={styles.modal}>
          <button onClick={() => closeModal("processFlow")}>Close Process Flow Modal</button>
        </div>
      )}
      {modalVisible.msp && (
        <div className={styles.modal}>
          <button onClick={() => closeModal("msp")}>Close MSP Modal</button>
        </div>
      )}
      {modalVisible.h2u && (
        <div className={styles.modal}>
          <button onClick={() => closeModal("h2u")}>Close H2U Modal</button>
        </div>
      )}

      <footer className={styles.footer}>
        © 2025 | Created by Avijit Kayet | About | Privacy Policy | Contact
      </footer>
    </div>
  );
}
