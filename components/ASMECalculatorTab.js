// components/ASMECalculatorTab.js
import { useState } from "react";

export default function ASMECalculatorTab() {
  const [type, setType] = useState("");
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setInputs({});
    setResult(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = async () => {
    if (!type) {
      alert("⚠️ Please select a component type");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/viiidiv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, values: inputs }),
      });

      const data = await res.json();
      if (data.error) {
        setResult({ error: data.error });
      } else {
        setResult(data);
      }
    } catch (err) {
      setResult({ error: "⚠️ Error connecting to server" });
    } finally {
      setLoading(false);
    }
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

      {/* ✅ Dynamic Form */}
      {type === "shell" && (
        <div className="form-section">
          <h3>Cylindrical Shell Inputs:</h3>
          <input
            type="number"
            name="P"
            placeholder="Internal Pressure (P)"
            onChange={handleInputChange}
          />
          <select name="Punit" onChange={handleInputChange}>
            <option value="MPa">MPa</option>
            <option value="bar">bar</option>
            <option value="kgcm2">kg/cm²</option>
            <option value="psi">psi</option>
          </select>
          <input
            type="number"
            name="S"
            placeholder="Design Stress (S)"
            onChange={handleInputChange}
          />
          <select name="Sunit" onChange={handleInputChange}>
            <option value="MPa">MPa</option>
            <option value="ksi">ksi</option>
            <option value="psi">psi</option>
            <option value="kgcm2">kg/cm²</option>
          </select>
          <input
            type="number"
            name="R"
            placeholder="Inside Radius (R)"
            onChange={handleInputChange}
          />
          <select name="Runit" onChange={handleInputChange}>
            <option value="mm">mm</option>
            <option value="inch">inch</option>
          </select>
          <input
            type="number"
            name="E"
            placeholder="Joint Efficiency (E)"
            defaultValue="1.0"
            onChange={handleInputChange}
          />
        </div>
      )}

      {type === "ellipsoidal" && (
        <div className="form-section">
          <h3>Ellipsoidal Head Inputs:</h3>
          <input
            type="number"
            name="P"
            placeholder="Internal Pressure (P)"
            onChange={handleInputChange}
          />
          <select name="Punit" onChange={handleInputChange}>
            <option value="MPa">MPa</option>
            <option value="bar">bar</option>
            <option value="kgcm2">kg/cm²</option>
            <option value="psi">psi</option>
          </select>
          <input
            type="number"
            name="D"
            placeholder="Inside Diameter (D)"
            onChange={handleInputChange}
          />
          <select name="Dunit" onChange={handleInputChange}>
            <option value="mm">mm</option>
            <option value="inch">inch</option>
          </select>
          <input
            type="number"
            name="S"
            placeholder="Design Stress (S)"
            onChange={handleInputChange}
          />
          <select name="Sunit" onChange={handleInputChange}>
            <option value="MPa">MPa</option>
            <option value="ksi">ksi</option>
            <option value="psi">psi</option>
            <option value="kgcm2">kg/cm²</option>
          </select>
          <input
            type="number"
            name="E"
            placeholder="Joint Efficiency (E)"
            defaultValue="1.0"
            onChange={handleInputChange}
          />
        </div>
      )}

      {type === "torispherical" && (
        <div className="form-section">
          <h3>Torispherical Head Inputs:</h3>
          <input
            type="number"
            name="P"
            placeholder="Internal Pressure (P)"
            onChange={handleInputChange}
          />
          <select name="Punit" onChange={handleInputChange}>
            <option value="MPa">MPa</option>
            <option value="bar">bar</option>
            <option value="kgcm2">kg/cm²</option>
            <option value="psi">psi</option>
          </select>
          <input
            type="number"
            name="D"
            placeholder="Inside Diameter (D)"
            onChange={handleInputChange}
          />
          <select name="Dunit" onChange={handleInputChange}>
            <option value="mm">mm</option>
            <option value="inch">inch</option>
          </select>
          <input
            type="number"
            name="S"
            placeholder="Design Stress (S)"
            onChange={handleInputChange}
          />
          <select name="Sunit" onChange={handleInputChange}>
            <option value="MPa">MPa</option>
            <option value="ksi">ksi</option>
            <option value="psi">psi</option>
            <option value="kgcm2">kg/cm²</option>
          </select>
          <input
            type="number"
            name="E"
            placeholder="Joint Efficiency (E)"
            defaultValue="1.0"
            onChange={handleInputChange}
          />
        </div>
      )}

      {type === "hemispherical" && (
        <div className="form-section">
          <h3>Hemispherical Head Inputs:</h3>
          <input
            type="number"
            name="P"
            placeholder="Internal Pressure (P)"
            onChange={handleInputChange}
          />
          <select name="Punit" onChange={handleInputChange}>
            <option value="MPa">MPa</option>
            <option value="bar">bar</option>
            <option value="kgcm2">kg/cm²</option>
            <option value="psi">psi</option>
          </select>
          <input
            type="number"
            name="D"
            placeholder="Inside Diameter (D)"
            onChange={handleInputChange}
          />
          <select name="Dunit" onChange={handleInputChange}>
            <option value="mm">mm</option>
            <option value="inch">inch</option>
          </select>
          <input
            type="number"
            name="S"
            placeholder="Design Stress (S)"
            onChange={handleInputChange}
          />
          <select name="Sunit" onChange={handleInputChange}>
            <option value="MPa">MPa</option>
            <option value="ksi">ksi</option>
            <option value="psi">psi</option>
            <option value="kgcm2">kg/cm²</option>
          </select>
          <input
            type="number"
            name="E"
            placeholder="Joint Efficiency (E)"
            defaultValue="1.0"
            onChange={handleInputChange}
          />
        </div>
      )}

      {/* ✅ Calculate Button */}
      {type && (
        <button onClick={handleCalculate} style={{ marginTop: "15px" }}>
          {loading ? "Calculating..." : "Calculate"}
        </button>
      )}

      {/* ✅ Results */}
      <div id="results" style={{ marginTop: "20px" }}>
        {result && result.error && (
          <p style={{ color: "red" }}>{result.error}</p>
        )}
        {result && result.thickness && (
          <p>
            🧮 <strong>{result.thickness} {result.unit}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
