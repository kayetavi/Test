// components/InventoryCalculatorTab.js
import { useState } from "react";

export default function InventoryCalculatorTab() {
  // 🔹 Shape & Phase
  const [shape, setShape] = useState("");
  const [phase, setPhase] = useState("");

  // 🔹 Dimensions
  const [diameter, setDiameter] = useState("");
  const [diameterUnit, setDiameterUnit] = useState("1");
  const [length, setLength] = useState("");
  const [lengthUnit, setLengthUnit] = useState("1");

  // 🔹 Dished Ends
  const [addHead, setAddHead] = useState(false);
  const [headType, setHeadType] = useState("hemihead");
  const [headCount, setHeadCount] = useState(2);

  // 🔹 Manual Volume
  const [useManualVolume, setUseManualVolume] = useState(false);
  const [manualVolume, setManualVolume] = useState("");
  const [manualVolumeUnit, setManualVolumeUnit] = useState("m3");

  // 🔹 Liquid Inputs
  const [equipmentType, setEquipmentType] = useState("");
  const [fluidType, setFluidType] = useState("");
  const [density, setDensity] = useState("");
  const [customPercent, setCustomPercent] = useState("");

  // 🔹 Vapor Inputs
  const [flowRate, setFlowRate] = useState("");
  const [flowRateUnit, setFlowRateUnit] = useState("kg/s");
  const [residenceTime, setResidenceTime] = useState(180);
  const [residenceTimeUnit, setResidenceTimeUnit] = useState("s");

  // 🔹 Result
  const [result, setResult] = useState("");

  // 🔹 Handlers
  const handleShapeChange = (e) => {
    setShape(e.target.value);
    setPhase(""); // Reset phase on shape change
  };

  const handlePhaseChange = (e) => setPhase(e.target.value);

  const toggleHeadSelection = () => setAddHead(!addHead);
  const toggleManualVolume = () => setUseManualVolume(!useManualVolume);

  // 🔹 Dummy calculation function
  const calculateInventory = () => {
    // Replace this with your actual calculation logic
    setResult(`Inventory calculated for shape: ${shape}, phase: ${phase}`);
  };

  return (
    <div className="inventory-tab">
      {/* Shape Selection */}
      <div>
        <label>Select Equipment Shape:</label>
        <select value={shape} onChange={handleShapeChange}>
          <option value="">-- Select --</option>
          <option value="cylinder">Cylinder</option>
          <option value="sphere">Sphere</option>
        </select>
      </div>

      {/* Phase Selection */}
      {shape && (
        <div>
          <label>Select Fluid Phase:</label>
          <select value={phase} onChange={handlePhaseChange}>
            <option value="">-- Select --</option>
            <option value="liquid">Liquid</option>
            <option value="vapor">Vapor</option>
            <option value="both">Two-Phase</option>
          </select>
        </div>
      )}

      {/* Dimensions */}
      {phase && phase !== "vapor" && (
        <div className="dimensions">
          <div>
            <label>Diameter (ID):</label>
            <input
              type="number"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
            />
            <select value={diameterUnit} onChange={(e) => setDiameterUnit(e.target.value)}>
              <option value="1">m</option>
              <option value="0.01">cm</option>
              <option value="0.001">mm</option>
            </select>
          </div>
          <div>
            <label>Length / Height:</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <select value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)}>
              <option value="1">m</option>
              <option value="0.01">cm</option>
              <option value="0.001">mm</option>
            </select>
          </div>
        </div>
      )}

      {/* Dished Ends */}
      {phase && phase !== "vapor" && (
        <div>
          <input type="checkbox" checked={addHead} onChange={toggleHeadSelection} />
          <label>Add Dished Ends?</label>

          {addHead && (
            <div>
              <label>Select Head Type:</label>
              <select value={headType} onChange={(e) => setHeadType(e.target.value)}>
                <option value="hemihead">Hemispherical</option>
                <option value="torispherical">Torispherical</option>
                <option value="ellipsoidalhead">Ellipsoidal (2:1)</option>
              </select>

              <label>How many heads?</label>
              <select value={headCount} onChange={(e) => setHeadCount(e.target.value)}>
                <option value={2}>2 (Both Ends)</option>
                <option value={1}>1 Head</option>
                <option value={0}>No Head</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Manual Volume */}
      <div>
        <input type="checkbox" checked={useManualVolume} onChange={toggleManualVolume} />
        <label>Use Manual Volume</label>

        {useManualVolume && (
          <div>
            <label>Manual Volume:</label>
            <input
              type="number"
              value={manualVolume}
              onChange={(e) => setManualVolume(e.target.value)}
            />
            <label>Unit:</label>
            <select value={manualVolumeUnit} onChange={(e) => setManualVolumeUnit(e.target.value)}>
              <option value="m3">m³</option>
              <option value="ft3">ft³</option>
            </select>
          </div>
        )}
      </div>

      {/* Liquid Inputs */}
      {phase === "liquid" || phase === "both" ? (
        <div>
          <label>Equipment Type:</label>
          <select value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="COLTOP">Column Top (25%)</option>
            <option value="COLMID">Column Middle (25%)</option>
            <option value="COLBTM">Column Bottom (37%)</option>
            <option value="DRUM">Drum (50%)</option>
            <option value="KODRUM">KO Pot (10%)</option>
            <option value="COMP">Compressor (0%)</option>
            <option value="PUMP">Pump (100%)</option>
            <option value="HEX">Heat Exchanger (50%)</option>
            <option value="PIPE">Piping (100%)</option>
            <option value="REACTOR">Reactor (15%)</option>
            <option value="custom">Custom %</option>
          </select>

          <label>Fluid Type:</label>
          <select value={fluidType} onChange={(e) => setFluidType(e.target.value)}>
            <option value="">-- Select Fluid --</option>
            <option value="water">Water</option>
            <option value="diesel">Diesel</option>
            <option value="crude">Crude Oil</option>
            <option value="ammonia">Ammonia</option>
            <option value="custom">Other / Custom</option>
          </select>

          <label>Density (kg/m³):</label>
          <input
            type="number"
            value={density}
            onChange={(e) => setDensity(e.target.value)}
          />

          {equipmentType === "custom" && (
            <div>
              <label>Custom Liquid % (0–1):</label>
              <input
                type="number"
                value={customPercent}
                onChange={(e) => setCustomPercent(e.target.value)}
              />
            </div>
          )}
        </div>
      ) : null}

      {/* Vapor Inputs */}
      {phase === "vapor" || phase === "both" ? (
        <div>
          <label>Flow Rate:</label>
          <input type="number" value={flowRate} onChange={(e) => setFlowRate(e.target.value)} />
          <select value={flowRateUnit} onChange={(e) => setFlowRateUnit(e.target.value)}>
            <option value="kg/s">kg/s</option>
            <option value="kg/min">kg/min</option>
            <option value="kg/h">kg/h</option>
          </select>

          <label>Residence Time:</label>
          <input
            type="number"
            value={residenceTime}
            onChange={(e) => setResidenceTime(e.target.value)}
          />
          <select value={residenceTimeUnit} onChange={(e) => setResidenceTimeUnit(e.target.value)}>
            <option value="s">seconds</option>
            <option value="min">minutes</option>
            <option value="h">hours</option>
          </select>
        </div>
      ) : null}

      <button onClick={calculateInventory} style={{ marginTop: "20px" }}>
        Calculate Inventory
      </button>

      {result && <div style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>{result}</div>}
    </div>
  );
}
