import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase-config";
import ASMECalculatorTab from "../components/ASMECalculatorTab";
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

  useEffect(() => {
    // Dropdown Toggle
    const settingsBtn = document.getElementById("settingsBtn");
    const dropdown = document.getElementById("dropdownContent");

    const handleClick = (e) => {
      e.stopPropagation();
      dropdown?.classList.toggle("show");
    };

    const handleWindowClick = () => {
      dropdown?.classList.remove("show");
    };

    settingsBtn?.addEventListener("click", handleClick);
    window.addEventListener("click", handleWindowClick);

    // Inject categories
    injectAPI581Category();
    injectAPI570Category();
    injectDesignThicknessCalculatorCategory();
    injectProcessFlowDiagramsCategory();
    injectCrackingMechanismCategory();
    injectStressMaterialDataCategory();

    return () => {
      settingsBtn?.removeEventListener("click", handleClick);
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "ASMESECTIONVIIIDIV1":
        return <ASMECalculatorTab />;
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
        </span>{" "}
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
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          {/* 🔽 Injected Category Panel */}
          <ul id="categoryList" className={styles.featuresList}></ul>
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

//////////////////////////////////////////////////////////
// ✅ Inject Category + Show/Hide Functions (as required)
//////////////////////////////////////////////////////////

function hideWelcomePanel() {
  const panel = document.getElementById("welcomePanel");
  if (panel) panel.style.display = "none";
}

function hideAllMainPanels() {
  document.querySelectorAll(".tab-content").forEach((t) => (t.style.display = "none"));
}

function toggleCategory(element) {
  const ul = element.nextElementSibling;
  const isExpanded = ul.style.display === "block";
  ul.style.display = isExpanded ? "none" : "block";

  if (isExpanded) {
    hideAllMainPanels();
    const welcome = document.getElementById("welcomePanel");
    if (welcome) welcome.style.display = "block";
  }
}

function injectAPI581Category() {
  const categoryList = document.getElementById("categoryList");
  const api581 = document.createElement("li");

  api581.innerHTML = `
    <span class="category" onclick="toggleCategory(this)">Risk-Based Inspection Methodology</span>
    <ul class="mechanisms" style="display:none;">
      <li><a href="#" onclick="hideAllMainPanels(); showCriteriaTab(); hideWelcomePanel()">Criteria of Finding Damage Mechanism</a></li>
      <li><a href="#" onclick="hideAllMainPanels(); showCorrosionFullTab(); hideWelcomePanel()">Damage Mechanism – Corrosion Rate Estimator</a></li>
      <li><a href="#" onclick="hideAllMainPanels(); showFluidSelectorTab(); hideWelcomePanel()">Representative Fluid</a></li>
      <li><a href="#" onclick="hideAllMainPanels(); showInventoryTab(); hideWelcomePanel()">Inventory Calculator</a></li>
      <li><a href="#" onclick="hideAllMainPanels(); showINSPECTIONCONFIDENCETab(); hideWelcomePanel()">Inspection Confidence</a></li>
      <li><a href="#" onclick="hideAllMainPanels(); showTOXIC_CALCULATIONTab(); hideWelcomePanel()">Toxic % Calculation</a></li>
      
      <li>
        <span class="subcategory" onclick="toggleCategory(this)">Quantitative</span>
        <ul class="mechanisms" style="display:none;">
          <li><a href="#" onclick="hideAllMainPanels(); showcof_calculatorTab(); hideWelcomePanel()">Risk Calculator_COF</a></li>
          <li><a href="#" onclick="hideAllMainPanels(); showQPOF_calculatorTab(); hideWelcomePanel()">Risk Calculator_POF</a></li>
        </ul>
      </li>

      <li>
        <span class="subcategory" onclick="toggleCategory(this)">Semi Quantitative</span>
        <ul class="mechanisms" style="display:none;">
          <li><a href="#" onclick="hideAllMainPanels(); showCORROSION_CALCULATIONTab(); hideWelcomePanel()">Risk Calculator</a></li>
        </ul>
      </li>
    </ul>
  `;
  categoryList.appendChild(api581);
}

function injectAPI570Category() {
  const categoryList = document.getElementById("categoryList");
  const api570 = document.createElement("li");
  api570.innerHTML = `
    <span class="category" onclick="toggleCategory(this)">Thickness Data Evaluation & Analysis</span>
    <ul class="mechanisms" style="display:none;">
      <li><a href="#" onclick="hideAllMainPanels(); showRemainingLifeTab(); hideWelcomePanel()">Statistical Analysis</a></li>
    </ul>
  `;
  categoryList.appendChild(api570);
}

function injectDesignThicknessCalculatorCategory() {
  const categoryList = document.getElementById("categoryList");
  const item = document.createElement("li");
  item.innerHTML = `
    <span class="category" onclick="toggleCategory(this)">Design Thickness Calculator</span>
    <ul class="mechanisms" style="display:none;">
      <li><a href="#" onclick="event.preventDefault(); hideAllMainPanels(); showASMEB31_3Tab(); hideWelcomePanel();">Process Piping</a></li>
      <li><a href="#" onclick="event.preventDefault(); hideAllMainPanels(); showASMESECTIONVIIIDIV1Tab(); hideWelcomePanel();">Pressure Vessel</a></li>
    </ul>
  `;
  categoryList.appendChild(item);
}

function injectProcessFlowDiagramsCategory() {
  const categoryList = document.getElementById("categoryList");
  const item = document.createElement("li");
  item.innerHTML = `
    <span class="category" onclick="toggleCategory(this)">Corrosion Diagrams</span>
    <ul class="mechanisms" style="display:none;">
      <li><a href="#" onclick="event.preventDefault(); showPROCESSFLOWDIAGRAMSTab();">HYDROPROCESSING</a></li>
      <li><a href="#" onclick="event.preventDefault(); showPROCESSFLOWDIAGRAMSFCCU();">FCCU</a></li>
    </ul>
  `;
  categoryList.appendChild(item);
}

function injectCrackingMechanismCategory() {
  const categoryList = document.getElementById("categoryList");
  const item = document.createElement("li");
  item.innerHTML = `
    <span class="category" onclick="toggleCategory(this)">Cracking Mechanism</span>
    <ul class="mechanisms" style="display:none;">
      <li><a href="#" onclick="event.preventDefault(); hideAllMainPanels(); showBRITTLEFRACTURETab(); hideWelcomePanel();">BRITTLE FRACTURE</a></li>
    </ul>
  `;
  categoryList.appendChild(item);
}

function injectStressMaterialDataCategory() {
  const categoryList = document.getElementById("categoryList");
  const item = document.createElement("li");
  item.innerHTML = `
    <span class="category" onclick="toggleCategory(this)">Material Data</span>
    <ul class="mechanisms" style="display:none;">
      <li><a href="#" onclick="event.preventDefault(); hideAllMainPanels(); showSTRESSVALUETab(); hideWelcomePanel();">Stress Value</a></li>
      <li><a href="#" onclick="event.preventDefault(); hideAllMainPanels(); showMATERIALSTRENGTHTab(); hideWelcomePanel();">Material Strength</a></li>
    </ul>
  `;
  categoryList.appendChild(item);
}
