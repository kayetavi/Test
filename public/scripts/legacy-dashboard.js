
  document.addEventListener("DOMContentLoaded", () => {  
  const settingsBtn = document.getElementById("settingsBtn");  
  const dropdown = document.getElementById("dropdownContent");  
  
  if (settingsBtn && dropdown) {  
    settingsBtn.addEventListener("click", e => {  
      e.stopPropagation();  
      dropdown.classList.toggle("show");  
    });  
  
    window.addEventListener("click", () => dropdown.classList.remove("show"));  
  }  
});  
  
  // ✅ Hide welcome panel  
  function hideWelcomePanel() {  
    const panel = document.getElementById("welcomePanel");  
    if (panel) {  
      panel.style.display = "none";  
    }  
  }  


function openHelp() {
  window.open("help.html", "_blank"); // ye help.html nayi tab me kholega
}
    
    
  function toggleCategory(element) {  
  const ul = element.nextElementSibling;  
  const isExpanded = ul.style.display === "block";  
  ul.style.display = isExpanded ? "none" : "block";  
  
  // ✅ If collapsing, show welcome panel again  
  if (isExpanded) {  
    // Hide any other content/panels  
    hideAllMainPanels();  
    // Show welcome panel  
    const welcome = document.getElementById("welcomePanel");  
    if (welcome) welcome.style.display = "block";  
  }  
}  
  
  function showCriteriaTab() {  
    document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
    document.getElementById("criteriaTab").style.display = "block";  
    document.getElementById("selectedMechanismTitle").style.display = "none";  
    hideWelcomePanel();  
  }  
  
  function showCorrosionTab() {  
    document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
    document.getElementById("corrosionRateTab").style.display = "block";  
    document.getElementById("selectedMechanismTitle").style.display = "none";  
    hideWelcomePanel();  
  }  
  
  function showCorrosionFullTab() {  
    document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
    document.getElementById("corrosionFullTab").style.display = "block";  
    document.getElementById("selectedMechanismTitle").style.display = "none";  
    hideWelcomePanel();  
  
    if (typeof corrosionChart !== "undefined" && corrosionChart.data) {  
      corrosionChart.update();  
    }  
  }  
  
 // ✅ NEW FUNCTION: Show Representative Fluid Tab  
  function showFluidSelectorTab() {  
    document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
    document.getElementById("fluidSelectorTab").style.display = "block";  
    document.getElementById("selectedMechanismTitle").style.display = "none";  
    hideWelcomePanel();  
  }  
  
  function showInventoryTab() {  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("inventoryTab").style.display = "block";  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
}  
  
  function showRemainingLifeTab() {  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("remainingLifeTab").style.display = "block";  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
}  
    function showINSPECTIONCONFIDENCETab() {  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("inspectionconfidenceTab").style.display = "block";  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
}  
   function showASMEB31_3Tab() {  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("ASMEB31_3Tab").style.display = "block";  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
}  
 function showASMESECTIONVIIIDIV1Tab() {  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("ASMESECTIONVIIIDIV1Tab").style.display = "block";  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
}

  function showTOXIC_CALCULATIONTab() {  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("TOXIC_CALCULATIONTab").style.display = "block";  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
}  

function showCORROSION_CALCULATIONTab() {  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("CORROSION_CALCULATIONTab").style.display = "block";  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
} 
function showcof_calculatorTab() {  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("cof_calculatorTab").style.display = "block";  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
}  
function showQPOF_calculatorTab() {  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("QPOF_calculatorTab").style.display = "block";  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
}  

function showCrackingMechanismTab() {
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");
  document.getElementById("crackingMechanismTab").style.display = "block";
  document.getElementById("selectedMechanismTitle").style.display = "none";
  hideWelcomePanel();
}

function showbkStressTab() {
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");
  document.getElementById("bkStressTab").style.display = "block";
  document.getElementById("selectedMechanismTitle").style.display = "none";
  hideWelcomePanel();
}


  
  function clearMechanismDetails() {  
    document.getElementById("mechanismDetailsContainer").innerHTML = "";  
    document.getElementById("selectedMechanismTitle").textContent = "Select a Damage Mechanism";  
    document.getElementById("selectedMechanismTitle").style.display = "block";  
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

      <!-- New Quantitative Subcategory -->
      <li>
        <span class="subcategory" onclick="toggleCategory(this)">Quantitative</span>
        <ul class="mechanisms" style="display:none;">
          <li><a href="#" onclick="hideAllMainPanels(); showcof_calculatorTab(); hideWelcomePanel()">Risk Calculator_COF</a></li>
          <li><a href="#" onclick="hideAllMainPanels(); showQPOF_calculatorTab(); hideWelcomePanel()">Risk Calculator_POF</a></li>
        </ul>
      </li>

      <!-- New Semi Quantitative Subcategory -->
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
  const designThicknessCalculator = document.createElement("li"); // ✅ FIXED LINE  
  
  designThicknessCalculator.innerHTML = `  
  <span class="category" onclick="toggleCategory(this)"> Design Thickness Calculator</span>  
  <ul class="mechanisms" style="display:none;">  
    <li><a href="#" onclick="event.preventDefault(); hideAllMainPanels(); showASMEB31_3Tab(); hideWelcomePanel();">Process Piping</a></li>  
    <li><a href="#" onclick="event.preventDefault(); hideAllMainPanels(); showASMESECTIONVIIIDIV1Tab(); hideWelcomePanel();">Pressure Vessel</a></li>  
  </ul>  
`;  
      
  categoryList.appendChild(designThicknessCalculator);  
}  
  
function injectCrackingMechanismCategory() {
  const categoryList = document.getElementById("categoryList");
  const crackingCategory = document.createElement("li");

  crackingCategory.innerHTML = `
    <span class="category" onclick="toggleCategory(this)">Cracking Mechanism Finder</span>
    <ul class="mechanisms" style="display:none;">
      <li><a href="#" onclick="event.preventDefault(); hideAllMainPanels(); showCrackingMechanismTab(); hideWelcomePanel();">Open Finder</a></li>
    </ul>
  `;

  categoryList.appendChild(crackingCategory);
}

function injectStressMaterialDataCategory() {
  const categoryList = document.getElementById("categoryList");
  const stressMaterialCategory = document.createElement("li");

  stressMaterialCategory.innerHTML = `
    <span class="category" onclick="toggleCategory(this)">Stress & Material Data</span>
    <ul class="mechanisms" style="display:none;">
      <li><a href="#" onclick="event.preventDefault(); hideAllMainPanels(); showbkStressTab(); hideWelcomePanel();">Stress value</a></li>
    </ul>
  `;

  categoryList.appendChild(stressMaterialCategory);
}
  
    
function showCDUVDUTab() {  
  // Hide all other tabs  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
  hideAllMainPanels(); // ✅ Also hide API 571 panels  
  
  // ✅ Close other modals if open  
  document.getElementById("processFlowModal").style.display = "none";  
  document.getElementById("mspModal").style.display = "none";  
  
  // ✅ Show CDU/VDU modal  
  document.getElementById("cduVduModal").style.display = "block";  
  initCDUVDU(); // ✅ Ensure SVG and logic are loaded  
}  
  
function closeCDUVDUModal() {  
  document.getElementById("cduVduModal").style.display = "none";  
  hideAllMainPanels(); // ✅ Ensure Damage Mechanism panels are hidden after close  
}  
  
function showPROCESSFLOWDIAGRAMSTab() {  
  // Hide all other tabs  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
  hideAllMainPanels(); // ✅ Hide DM panels to prevent residual view  
  
  // ✅ Close other modals if open  
  document.getElementById("cduVduModal").style.display = "none";  
  document.getElementById("mspModal").style.display = "none";  
  
  // ✅ Show Process Flow modal  
  document.getElementById("processFlowModal").style.display = "block";  
}  
  
function closeProcessFlowModal() {  
  document.getElementById("processFlowModal").style.display = "none";  
  hideAllMainPanels(); // ✅ Clean up API 571 panels  
}  
  
function showMSPTab() {  
  // Hide all other tabs  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
  hideAllMainPanels(); // ✅ Hide DM panels  
  
  // ✅ Close other modals if open  
  document.getElementById("cduVduModal").style.display = "none";  
  document.getElementById("processFlowModal").style.display = "none";  
  
  // ✅ Show MSP modal  
  document.getElementById("mspModal").style.display = "block";  
  initMSP(); // ✅ Ensure SVG and logic are loaded  
}  
  
function closeMSPModal() {  
  document.getElementById("mspModal").style.display = "none";  
  hideAllMainPanels(); // ✅ Ensure Damage Mechanism panels are hidden after close  
}  
  
  function showH2UTab() {  
  // Hide all other tabs  
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");  
  document.getElementById("selectedMechanismTitle").style.display = "none";  
  hideWelcomePanel();  
  hideAllMainPanels();  
  
  // ✅ Close other modals if open  
  document.getElementById("cduVduModal").style.display = "none";  
  document.getElementById("processFlowModal").style.display = "none";  
  document.getElementById("mspModal").style.display = "none";  
  
  // ✅ Show H2U modal  
  document.getElementById("h2uModal").style.display = "block";  
  initH2U();   
}  
  
function closeH2UModal() {  
  document.getElementById("h2uModal").style.display = "none";  
  hideAllMainPanels();   
}  
  
// ✅ Inject Process Flow Diagrams with all tabs  
function injectProcessFlowDiagramsCategory() {  
  const categoryList = document.getElementById("categoryList");  
  const processFlowDiagrams = document.createElement("li");  
  
  processFlowDiagrams.innerHTML = `  
    <span class="category" onclick="toggleCategory(this)"> Corrosion Diagrams</span>  
    <ul class="mechanisms" style="display:none;">  
      <li><a href="#" onclick="event.preventDefault(); showPROCESSFLOWDIAGRAMSTab();">HYDROPROCESSING</a></li>  
      <li><a href="#" onclick="event.preventDefault(); showCDUVDUTab();">CDU / VDU</a></li>  
      <li><a href="#" onclick="event.preventDefault(); showMSPTab();">MSP</a></li>  
      <li><a href="#" onclick="event.preventDefault(); showH2UTab();">H2U</a></li>  
    </ul>  
  `;  
  
  categoryList.appendChild(processFlowDiagrams);  
}  

  
    
  window.addEventListener("DOMContentLoaded", () => {  
  loadCategories(data);  
  injectAPI581Category();  
  injectAPI570Category();  
  injectDesignThicknessCalculatorCategory();  
    injectProcessFlowDiagramsCategory();  
     injectCrackingMechanismCategory();
    injectStressMaterialDataCategory();
      
});  
  
