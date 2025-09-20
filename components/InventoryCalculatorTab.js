import { useState } from "react";
import useInventoryCalculator from "../hooks/useInventoryCalculator";

export default function InventoryCalculatorTab() {
  const {
    state,
    handleInputChange,
    toggleHeadSelection,
    toggleManualVolume,
    handleShapeChange,
    handlePhaseChange,
    calculateInventory,
  } = useInventoryCalculator();

  const {
    shape,
    phase,
    diameter,
    diameterUnit,
    length,
    lengthUnit,
    addHead,
    headType,
    headCount,
    useManualVolume,
    manualVolume,
    manualVolumeUnit,
    equipmentType,
    fluidType,
    density,
    customPercent,
    flowRate,
    flowRateUnit,
    residenceTime,
    residenceTimeUnit,
    result,
  } = state;

  return (
    <div className="inventory-tab space-y-4">
      {/* ---------------- Equipment Shape ---------------- */}
      <div>
        <label>Select Equipment Shape:</label>
        <select value={shape} onChange={handleShapeChange}>
          <option value="">-- Select --</option>
          <option value="cylinder">Cylinder</option>
          <option value="sphere">Sphere</option>
        </select>
      </div>

      {/* ---------------- Phase Selection ---------------- */}
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

      {/* ---------------- Dimensions ---------------- */}
      {phase && phase !== "vapor" && (
        <div className="dimensions space-y-2">
          <div>
            <label>Diameter (ID):</label>
            <input
              type="number"
              name="diameter"
              value={diameter}
              onChange={handleInputChange}
            />
            <select
              name="diameterUnit"
              value={diameterUnit}
              onChange={handleInputChange}
            >
              <option value="1">m</option>
              <option value="0.01">cm</option>
              <option value="0.001">mm</option>
            </select>
          </div>

          <div>
            <label>Length / Height:</label>
            <input
              type="number"
              name="length"
              value={length}
              onChange={handleInputChange}
            />
            <select
              name="lengthUnit"
              value={lengthUnit}
              onChange={handleInputChange}
            >
              <option value="1">m</option>
              <option value="0.01">cm</option>
              <option value="0.001">mm</option>
            </select>
          </div>
        </div>
      )}

      {/* ---------------- Heads (Dished Ends) ---------------- */}
      {phase && phase !== "vapor" && (
        <div className="space-y-2">
          <label>
            <input
              type="checkbox"
              checked={addHead}
              onChange={toggleHeadSelection}
            />{" "}
            Add Dished Ends?
          </label>

          {addHead && (
            <>
              <label>Select Head Type:</label>
              <select
                name="headType"
                value={headType}
                onChange={handleInputChange}
              >
                <option value="hemihead">Hemispherical</option>
                <option value="torispherical">Torispherical</option>
                <option value="ellipsoidalhead">Ellipsoidal (2:1)</option>
              </select>

              <label>How many heads?</label>
              <select
                name="headCount"
                value={headCount}
                onChange={handleInputChange}
              >
                <option value={2}>2 (Both Ends)</option>
                <option value={1}>1 Head</option>
                <option value={0}>No Head</option>
              </select>
            </>
          )}
        </div>
      )}

      {/* ---------------- Manual Volume ---------------- */}
      <div className="space-y-2">
        <label>
          <input
            type="checkbox"
            checked={useManualVolume}
            onChange={toggleManualVolume}
          />{" "}
          Use Manual Volume
        </label>

        {useManualVolume && (
          <div>
            <label>Manual Volume:</label>
            <input
              type="number"
              name="manualVolume"
              value={manualVolume}
              onChange={handleInputChange}
            />
            <label>Unit:</label>
            <select
              name="manualVolumeUnit"
              value={manualVolumeUnit}
              onChange={handleInputChange}
            >
              <option value="m3">m³</option>
              <option value="ft3">ft³</option>
            </select>
          </div>
        )}
      </div>

      {/* ---------------- Liquid Section ---------------- */}
      {(phase === "liquid" || phase === "both") && (
        <div className="space-y-2">
          <label>Equipment Type:</label>
          <select
            name="equipmentType"
            value={equipmentType}
            onChange={handleInputChange}
          >
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
          <select
            name="fluidType"
            value={fluidType}
            onChange={handleInputChange}
          >
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
            name="density"
            value={density}
            onChange={handleInputChange}
          />

          {equipmentType === "custom" && (
            <>
              <label>Custom Liquid % (0–1):</label>
              <input
                type="number"
                name="customPercent"
                value={customPercent}
                onChange={handleInputChange}
              />
            </>
          )}
        </div>
      )}

      {/* ---------------- Vapor Section ---------------- */}
      {(phase === "vapor" || phase === "both") && (
        <div className="space-y-2">
          <label>Flow Rate:</label>
          <input
            type="number"
            name="flowRate"
            value={flowRate}
            onChange={handleInputChange}
          />
          <select
            name="flowRateUnit"
            value={flowRateUnit}
            onChange={handleInputChange}
          >
            <option value="kg/s">kg/s</option>
            <option value="kg/min">kg/min</option>
            <option value="kg/h">kg/h</option>
          </select>

          <label>Residence Time:</label>
          <input
            type="number"
            name="residenceTime"
            value={residenceTime}
            onChange={handleInputChange}
          />
          <select
            name="residenceTimeUnit"
            value={residenceTimeUnit}
            onChange={handleInputChange}
          >
            <option value="s">seconds</option>
            <option value="min">minutes</option>
            <option value="h">hours</option>
          </select>
        </div>
      )}

      {/* ---------------- Calculate Button ---------------- */}
      <button
        onClick={calculateInventory}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate Inventory
      </button>

      {/* ---------------- Result ---------------- */}
      {result && (
        <div className="mt-4 font-bold text-green-600">
          {result}
        </div>
      )}
    </div>
  );
}
