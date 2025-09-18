// components/ASMECalculatorTab.js
import { useState } from "react";

export default function ASMECalculatorTab() {
  const [type, setType] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCalculate = () => {
    // ✅ Calculation logic yaha implement hoga
    console.log("Calculating thickness for:", type);
  };

  return (
    <div className="tab-content" id="ASMESECTIONVIIIDIV1Tab">
      <h1>Pressure Vessel – Shell & Head Thickness Calculator</h1>

      {/* Component Type Selection */}
      <label>Select Type:</label>
      <select value={type} onChange={handleTypeChange}>
        <option value="">-- Select Component Type --</option>
        <option value="shell">Shell</option>
        <option value="ellipsoidal">Ellipsoidal Head</option>
        <option value="torispherical">Torispherical Head</option>
        <option value="hemispherical">Hemispherical Head</option>
      </select>

      {/* ✅ SHELL FORM */}
      {type === "shell" && (
        <div className="form-section">
          <h3>Cylindrical Shell Inputs:</h3>
          <div className="input-grid">
            <div>
              <label>Internal Pressure (P)</label>
              <input type="number" step="0.01" />
            </div>
            <div>
              <label>Unit</label>
              <select>
                <option value="MPa">MPa</option>
                <option value="bar">bar</option>
                <option value="kgcm2">kg/cm²</option>
                <option value="psi">psi</option>
              </select>
            </div>
            <div>
              <label>Design Stress (S)</label>
              <input type="number" step="0.01" />
            </div>
            <div>
              <label>Unit</label>
              <select>
                <option value="MPa">MPa</option>
                <option value="ksi">ksi</option>
                <option value="psi">psi</option>
                <option value="kgcm2">kg/cm²</option>
              </select>
            </div>
          </div>

          <div className="input-grid" style={{ marginTop: "10px" }}>
            <div>
              <label>Inside Radius (R)</label>
              <input type="number" step="0.01" />
            </div>
            <div>
              <label>Unit</label>
              <select>
                <option value="mm">mm</option>
                <option value="inch">inch</option>
              </select>
            </div>
            <div>
              <label>Joint Efficiency (E)</label>
              <input type="number" step="0.01" defaultValue="1.0" />
            </div>
          </div>
        </div>
      )}

      {/* ✅ ELLIPSOIDAL HEAD */}
      {type === "ellipsoidal" && (
        <div className="form-section">
          <h3>Ellipsoidal Head Inputs:</h3>
          <div className="input-grid">
            <div>
              <label>Internal Pressure (P)</label>
              <input type="number" step="0.01" />
              <select>
                <option value="MPa">MPa</option>
                <option value="bar">bar</option>
                <option value="kgcm2">kg/cm²</option>
                <option value="psi">psi</option>
              </select>
            </div>
            <div>
              <label>Inside Diameter (D)</label>
              <input type="number" step="0.01" />
              <select>
                <option value="mm">mm</option>
                <option value="inch">inch</option>
              </select>
            </div>
            <div>
              <label>Design Stress (S)</label>
              <input type="number" step="0.01" />
              <select>
                <option value="MPa">MPa</option>
                <option value="ksi">ksi</option>
                <option value="psi">psi</option>
                <option value="kgcm2">kg/cm²</option>
              </select>
            </div>
            <div>
              <label>Joint Efficiency (E)</label>
              <input type="number" step="0.01" defaultValue="1.0" />
            </div>
          </div>
        </div>
      )}

      {/* ✅ TORISPHERICAL HEAD */}
      {type === "torispherical" && (
        <div className="form-section">
          <h3>Torispherical Head Inputs:</h3>
          <div className="input-grid">
            <div>
              <label>Internal Pressure (P)</label>
              <input type="number" step="0.01" />
              <select>
                <option value="MPa">MPa</option>
                <option value="bar">bar</option>
                <option value="kgcm2">kg/cm²</option>
                <option value="psi">psi</option>
              </select>
            </div>
            <div>
              <label>Inside Diameter (D)</label>
              <input type="number" step="0.01" />
              <select>
                <option value="mm">mm</option>
                <option value="inch">inch</option>
              </select>
            </div>
            <div>
              <label>Design Stress (S)</label>
              <input type="number" step="0.01" />
              <select>
                <option value="MPa">MPa</option>
                <option value="ksi">ksi</option>
                <option value="psi">psi</option>
                <option value="kgcm2">kg/cm²</option>
              </select>
            </div>
            <div>
              <label>Joint Efficiency (E)</label>
              <input type="number" step="0.01" defaultValue="1.0" />
            </div>
          </div>
        </div>
      )}

      {/* ✅ HEMISPHERICAL HEAD */}
      {type === "hemispherical" && (
        <div className="form-section">
          <h3>Hemispherical Head Inputs:</h3>
          <div className="input-grid">
            <div>
              <label>Internal Pressure (P)</label>
              <input type="number" step="0.01" />
              <select>
                <option value="MPa">MPa</option>
                <option value="bar">bar</option>
                <option value="kgcm2">kg/cm²</option>
                <option value="psi">psi</option>
              </select>
            </div>
            <div>
              <label>Inside Diameter (D)</label>
              <input type="number" step="0.01" />
              <select>
                <option value="mm">mm</option>
                <option value="inch">inch</option>
              </select>
            </div>
            <div>
              <label>Design Stress (S)</label>
              <input type="number" step="0.01" />
              <select>
                <option value="MPa">MPa</option>
                <option value="ksi">ksi</option>
                <option value="psi">psi</option>
                <option value="kgcm2">kg/cm²</option>
              </select>
            </div>
            <div>
              <label>Joint Efficiency (E)</label>
              <input type="number" step="0.01" defaultValue="1.0" />
            </div>
          </div>
        </div>
      )}

      {/* ✅ Calculate Button */}
      {type && (
        <button onClick={handleCalculate} style={{ marginTop: "15px" }}>
          Calculate
        </button>
      )}

      {/* ✅ Results */}
      <div id="results"></div>
    </div>
  );
}
