import { useState } from "react";
// import styles from "../styles/ProcessPiping.module.css"; // TEMPORARILY DISABLED
export default function ProcessPipingCalculator() {
  // 🔹 States
  const [pressure, setPressure] = useState("");
  const [pressureUnit, setPressureUnit] = useState("");
  const [stress, setStress] = useState("");
  const [stressUnit, setStressUnit] = useState("");
  const [diameter, setDiameter] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [yMaterial, setYMaterial] = useState("");
  const [yFactor, setYFactor] = useState("");
  const [highTemp, setHighTemp] = useState("no");
  const [wFactor, setWFactor] = useState("1.0");
  const [includeCA, setIncludeCA] = useState("");
  const [corrosionAllowance, setCorrosionAllowance] = useState(3.0);
  const [includeMillTol, setIncludeMillTol] = useState("");
  const [nominalThickness, setNominalThickness] = useState("");
  const [materialStd, setMaterialStd] = useState("");
  const [autoMillTol, setAutoMillTol] = useState("");
  const [result, setResult] = useState("--");
  const [loading, setLoading] = useState(false);

  // 🔹 Event Handlers

  // Example updateYDropdown function for demonstration
  const updateYDropdown = () => {
    // This can be dynamic based on material, here just example values:
    if (yMaterial === "ferritic") {
      setYFactor("0.4");
    } else if (yMaterial === "austenitic") {
      setYFactor("0.3");
    } else {
      setYFactor("");
    }
  };

  const toggleWeldFactor = (value) => {
    setHighTemp(value);
    if (value === "no") setWFactor("1.0");
  };

  const toggleCABox = (value) => setIncludeCA(value);
  const toggleMillToleranceSection = (value) => setIncludeMillTol(value);

  const loadMillTolerance = () => {
    // Example static logic - replace with real logic or API call if needed
    if (materialStd === "A53" && nominalThickness) {
      // Just a dummy calculation for demo
      setAutoMillTol((parseFloat(nominalThickness) * 0.1).toFixed(2));
    } else if (materialStd === "A106" && nominalThickness) {
      setAutoMillTol((parseFloat(nominalThickness) * 0.15).toFixed(2));
    } else {
      setAutoMillTol("");
    }
  };

  const calculateThickness = async () => {
    setLoading(true);
    setResult("--");

    try {
      // Build request payload with proper parsing
      const payload = {
        pressure: parseFloat(pressure),
        pressureUnit,
        stress: parseFloat(stress),
        stressUnit,
        diameter: parseFloat(diameter),
        efficiency: parseFloat(efficiency),
        yMaterial,
        yFactor,
        wFactor: parseFloat(wFactor),
        corrosionAllowance: includeCA === "yes" ? parseFloat(corrosionAllowance) : 0,
        includeMillTol: includeMillTol === "yes",
        nominalThickness: includeMillTol === "yes" ? parseFloat(nominalThickness) : 0,
        materialStd,
        autoMillTol: includeMillTol === "yes" ? parseFloat(autoMillTol) || 0 : 0,
        highTemp,
      };

      const response = await fetch("/api/ProcessPipingCalculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.thickness ? `${data.thickness} mm` : "No result");
      } else {
        setResult("Error: " + (data.message || "Calculation failed"));
      }
    } catch (error) {
      setResult("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2>Process Piping Thickness Calculator</h2>

      {/* Row 1: Design Pressure + Unit */}
      <div className={styles.row}>
        <div className={styles.col}>
          <label>Design Pressure (P):</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter Pressure"
            value={pressure}
            onChange={(e) => setPressure(e.target.value)}
          />
        </div>
        <div className={styles.col}>
          <label>Unit:</label>
          <select value={pressureUnit} onChange={(e) => setPressureUnit(e.target.value)}>
            <option value="">-- Select Unit --</option>
            <option value="MPa">MPa</option>
            <option value="kgcm2">kg/cm²</option>
            <option value="bar">bar</option>
            <option value="psi">psi</option>
          </select>
        </div>
      </div>

      {/* Row 2: Allowable Stress + Unit */}
      <div className={styles.row}>
        <div className={styles.col}>
          <label>Allowable Stress (S):</label>
          <input
            type="number"
            step="0.1"
            placeholder="Enter Stress"
            value={stress}
            onChange={(e) => setStress(e.target.value)}
          />
        </div>
        <div className={styles.col}>
          <label>Unit:</label>
          <select value={stressUnit} onChange={(e) => setStressUnit(e.target.value)}>
            <option value="">-- Select Unit --</option>
            <option value="MPa">MPa</option>
            <option value="ksi">ksi</option>
            <option value="kgcm2">kg/cm²</option>
            <option value="psi">psi</option>
          </select>
        </div>
      </div>

      {/* Row 3: Nominal Diameter + Weld Efficiency */}
      <div className={styles.row}>
        <div className={styles.col}>
          <label>Nominal Pipe Size (NPS):</label>
          <select value={diameter} onChange={(e) => setDiameter(e.target.value)}>
            <option value="">-- Select OD Size --</option>
            <option value="21.3">NPS 1/2" - 21.3 mm</option>
            <option value="26.7">NPS 3/4" - 26.7 mm</option>
            <option value="33.4">NPS 1" - 33.4 mm</option>
            {/* Add all other options */}
          </select>
        </div>
        <div className={styles.col}>
          <label>Weld Joint Efficiency (E):</label>
          <select value={efficiency} onChange={(e) => setEfficiency(e.target.value)}>
            <option value="">-- Select Efficiency --</option>
            <option value="1.0">Seamless / 100% RT (1.00)</option>
            <option value="0.95">Double Butt Welded (0.95)</option>
            <option value="0.90">Spot RT (0.90)</option>
            {/* Add other options */}
          </select>
        </div>
      </div>

      {/* Row 4: Y Material + Y Factor */}
      <div className={styles.row}>
        <div className={styles.col}>
          <label>Y Factor Material:</label>
          <select
            value={yMaterial}
            onChange={(e) => {
              setYMaterial(e.target.value);
              updateYDropdown();
            }}
          >
            <option value="">-- Select Material --</option>
            <option value="ferritic">Ferritic Steel</option>
            <option value="austenitic">Austenitic Stainless Steel</option>
            <option value="nickel">Nickel Alloy</option>
            <option value="grayiron">Gray Iron</option>
            <option value="other">Other Ductile Metals</option>
          </select>
        </div>
        <div className={styles.col}>
          <label>Y Factor (Design Temperature):</label>
          <select value={yFactor} onChange={(e) => setYFactor(e.target.value)}>
            <option value="">-- Select Temperature --</option>
            {/* Populate dynamically if needed */}
          </select>
        </div>
      </div>

      {/* Row 5: High Temp Service + Corrosion Allowance */}
      <div className={styles.row}>
        <div className={styles.col}>
          <label>High-Temperature Service?</label>
          <select value={highTemp} onChange={(e) => toggleWeldFactor(e.target.value)}>
            <option value="no">No</option>
            <option value="yes">Yes (T &gt; 427{"\u00B0"}C)</option>
          </select>

          {highTemp === "yes" && (
            <div style={{ marginTop: "8px" }}>
              <label>Weld Strength Reduction Factor (W):</label>
              <select value={wFactor} onChange={(e) => setWFactor(e.target.value)}>
                <option value="1.0">≤427°C — W = 1.00</option>
                <option value="0.95">454°C — W = 0.95</option>
                {/* Add other options */}
              </select>
            </div>
          )}
        </div>

        <div className={styles.col}>
          <label>Include Corrosion Allowance?</label>
          <select value={includeCA} onChange={(e) => toggleCABox(e.target.value)}>
            <option value="">--Select--</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>

      {includeCA === "yes" && (
        <div className={styles.row}>
          <div className={styles.col}>
            <label>Corrosion Allowance (CA) [mm]:</label>
            <input
              type="number"
              value={corrosionAllowance}
              step="0.1"
              onChange={(e) => setCorrosionAllowance(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Mill Tolerance */}
      <div className={styles.row}>
        <div className={styles.col}>
          <label>Include Mill Tolerance?</label>
          <select value={includeMillTol} onChange={(e) => toggleMillToleranceSection(e.target.value)}>
            <option value="">--Select--</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>

      {includeMillTol === "yes" && (
        <div className={styles.row}>
          <div className={styles.col}>
            <label>Nominal Thickness (mm):</label>
            <input
              type="number"
              value={nominalThickness}
              step="0.1"
              onChange={(e) => setNominalThickness(e.target.value)}
            />
          </div>
          <div className={styles.col}>
            <label>Material Standard:</label>
            <select
              value={materialStd}
              onChange={(e) => {
                setMaterialStd(e.target.value);
                loadMillTolerance();
              }}
            >
              <option value="">--Select--</option>
              <option value="A53">A53</option>
              <option value="A106">A106</option>
              {/* Add all other options */}
            </select>
          </div>
          <div className={styles.col}>
            <label>Auto Mill Tolerance:</label>
            <input type="text" value={autoMillTol} readOnly />
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <button type="button" onClick={calculateThickness} disabled={loading}>
        Calculate
      </button>

      {/* Loading Spinner */}
      {loading && <p>Calculating...</p>}

      {/* Result */}
      <div className={styles.row}>
        <div className={styles.col}>
          <label>Required Thickness:</label>
          <div>{result}</div>
        </div>
      </div>
    </div>
  );
}
