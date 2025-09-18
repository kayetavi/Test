// components/ASMECalculatorTab.js
import { useState } from "react";

export default function ASMECalculatorTab() {
  const [type, setType] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="tab-content">
      <h1>Pressure Vessel – Shell & Head Thickness Calculator</h1>

      <label>Select Type:</label>
      <select value={type} onChange={handleTypeChange}>
        <option value="">-- Select Component Type --</option>
        <option value="shell">Shell</option>
        <option value="ellipsoidal">Ellipsoidal Head</option>
        <option value="torispherical">Torispherical Head</option>
        <option value="hemispherical">Hemispherical Head</option>
      </select>

      {type === "shell" && (
        <div>
          <h3>Cylindrical Shell Inputs:</h3>
          {/* Aapka shell form inputs yahaan daala jaayega */}
        </div>
      )}

      {type === "ellipsoidal" && (
        <div>
          <h3>Ellipsoidal Head Inputs:</h3>
          {/* Ellipsoidal form inputs yahaan daala jaayega */}
        </div>
      )}

      {type === "torispherical" && (
        <div>
          <h3>Torispherical Head Inputs:</h3>
          {/* Torispherical form inputs yahaan daala jaayega */}
        </div>
      )}

      {type === "hemispherical" && (
        <div>
          <h3>Hemispherical Head Inputs:</h3>
          {/* Hemispherical form inputs yahaan daala jaayega */}
        </div>
      )}
    </div>
  );
}
