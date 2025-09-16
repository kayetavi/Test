// ✅ Admin Tabs JS: Load only for admin users

document.addEventListener("DOMContentLoaded", () => {
  const settingsBtn = document.getElementById("settingsBtn");
  const dropdown = document.getElementById("dropdownContent");

  if (settingsBtn && dropdown) {
    settingsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });

    window.addEventListener("click", () => dropdown.classList.remove("show"));
  }

  // Inject all API / Process Flow categories
  injectAPI581Category();
  injectAPI570Category();
  injectDesignThicknessCalculatorCategory();
  injectProcessFlowDiagramsCategory();
  injectCrackingMechanismCategory();
  injectStressMaterialDataCategory();
});

// ------------------- HELPER FUNCTIONS -------------------

function hideWelcomePanel() {
  const panel = document.getElementById("welcomePanel");
  if (panel) panel.style.display = "none";
}

function hideAllMainPanels() {
  document.querySelectorAll(".tab-content").forEach((t) => (t.style.display = "none"));
}

// ------------------- SHOW TAB FUNCTIONS -------------------

function showTab(tabId) {
  hideAllMainPanels();
  const tab = document.getElementById(tabId);
  if (tab) tab.style.display = "block";
  hideWelcomePanel();
  const title = document.getElementById("selectedMechanismTitle");
  if (title) title.style.display = "none";
}

function showCriteriaTab() { showTab("criteriaTab"); }
function showCorrosionTab() { showTab("corrosionRateTab"); }
function showCorrosionFullTab() { showTab("corrosionFullTab"); }
function showFluidSelectorTab() { showTab("fluidSelectorTab"); }
function showInventoryTab() { showTab("inventoryTab"); }
function showRemainingLifeTab() { showTab("remainingLifeTab"); }
function showINSPECTIONCONFIDENCETab() { showTab("inspectionconfidenceTab"); }
function showASMEB31_3Tab() { showTab("ASMEB31_3Tab"); }
function showASMESECTIONVIIIDIV1Tab() { showTab("ASMESECTIONVIIIDIV1Tab"); }
function showTOXIC_CALCULATIONTab() { showTab("TOXIC_CALCULATIONTab"); }
function showCORROSION_CALCULATIONTab() { showTab("CORROSION_CALCULATIONTab"); }
function showcof_calculatorTab() { showTab("cof_calculatorTab"); }
function showQPOF_calculatorTab() { showTab("QPOF_calculatorTab"); }
function showCrackingMechanismTab() { showTab("crackingMechanismTab"); }
function showbkStressTab() { showTab("bkStressTab"); }
function showCDUVDUTab() { showTab("cduVduModal"); initCDUVDU(); }
function showPROCESSFLOWDIAGRAMSTab() { showTab("processFlowModal"); }
function showMSPTab() { showTab("mspModal"); initMSP(); }
function showH2UTab() { showTab("h2uModal"); initH2U(); }

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "none";
  hideAllMainPanels();
}
function closeCDUVDUModal() { closeModal("cduVduModal"); }
function closeProcessFlowModal() { closeModal("processFlowModal"); }
function closeMSPModal() { closeModal("mspModal"); }
function closeH2UModal() { closeModal("h2uModal"); }

// ------------------- CATEGORY INJECTION -------------------

function createCategory(name, subcategories = []) {
  const li = document.createElement("li");
  li.innerHTML = `<span class="category" onclick="toggleCategory(this)">${name}</span>`;
  if (subcategories.length > 0) {
    const ul = document.createElement("ul");
    ul.className = "mechanisms";
    ul.style.display = "none";
    subcategories.forEach((sub) => ul.appendChild(sub));
    li.appendChild(ul);
  }
  return li;
}

function createSubLink(name, callback) {
  const li = document.createElement("li");
  li.innerHTML = `<a href="#" onclick="event.preventDefault(); hideAllMainPanels(); ${callback}; hideWelcomePanel();">${name}</a>`;
  return li;
}

// ------------------- INJECT API 581 CATEGORY -------------------

function injectAPI581Category() {
  const categoryList = document.getElementById("categoryList");
  const sublinks = [
    createSubLink("Criteria of Finding Damage Mechanism", "showCriteriaTab()"),
    createSubLink("Damage Mechanism – Corrosion Rate Estimator", "showCorrosionFullTab()"),
    createSubLink("Representative Fluid", "showFluidSelectorTab()"),
    createSubLink("Inventory Calculator", "showInventoryTab()"),
    createSubLink("Inspection Confidence", "showINSPECTIONCONFIDENCETab()"),
    createSubLink("Toxic % Calculation", "showTOXIC_CALCULATIONTab()"),
  ];

  // Quantitative Subcategory
  const quantitative = createCategory("Quantitative", [
    createSubLink("Risk Calculator_COF", "showcof_calculatorTab()"),
    createSubLink("Risk Calculator_POF", "showQPOF_calculatorTab()"),
  ]);

  // Semi Quantitative Subcategory
  const semiQuant = createCategory("Semi Quantitative", [
    createSubLink("Risk Calculator", "showCORROSION_CALCULATIONTab()"),
  ]);

  const main = createCategory("Risk-Based Inspection Methodology", [...sublinks, quantitative, semiQuant]);
  categoryList.appendChild(main);
}

// ------------------- INJECT OTHER CATEGORIES -------------------

function injectAPI570Category() {
  const categoryList = document.getElementById("categoryList");
  const main = createCategory("Thickness Data Evaluation & Analysis", [
    createSubLink("Statistical Analysis", "showRemainingLifeTab()"),
  ]);
  categoryList.appendChild(main);
}

function injectDesignThicknessCalculatorCategory() {
  const categoryList = document.getElementById("categoryList");
  const main = createCategory("Design Thickness Calculator", [
    createSubLink("Process Piping", "showASMEB31_3Tab()"),
    createSubLink("Pressure Vessel", "showASMESECTIONVIIIDIV1Tab()"),
  ]);
  categoryList.appendChild(main);
}

function injectCrackingMechanismCategory() {
  const categoryList = document.getElementById("categoryList");
  const main = createCategory("Cracking Mechanism Finder", [
    createSubLink("Open Finder", "showCrackingMechanismTab()"),
  ]);
  categoryList.appendChild(main);
}

function injectStressMaterialDataCategory() {
  const categoryList = document.getElementById("categoryList");
  const main = createCategory("Stress & Material Data", [
    createSubLink("Stress value", "showbkStressTab()"),
  ]);
  categoryList.appendChild(main);
}

function injectProcessFlowDiagramsCategory() {
  const categoryList = document.getElementById("categoryList");
  const main = createCategory("Corrosion Diagrams", [
    createSubLink("HYDROPROCESSING", "showPROCESSFLOWDIAGRAMSTab()"),
    createSubLink("CDU / VDU", "showCDUVDUTab()"),
    createSubLink("MSP", "showMSPTab()"),
    createSubLink("H2U", "showH2UTab()"),
  ]);
  categoryList.appendChild(main);
}

// ------------------- TOGGLE CATEGORY -------------------

function toggleCategory(element) {
  const ul = element.nextElementSibling;
  const isExpanded = ul && ul.style.display === "block";
  if (ul) ul.style.display = isExpanded ? "none" : "block";

  if (isExpanded) {
    hideAllMainPanels();
    const welcome = document.getElementById("welcomePanel");
    if (welcome) welcome.style.display = "block";
  }
}
