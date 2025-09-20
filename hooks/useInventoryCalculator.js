// hooks/useInventoryCalculator.js
import { useState } from "react";

export default function useInventoryCalculator() {
  const [state, setState] = useState({
    shape: "",
    phase: "",
    diameter: "",
    diameterUnit: "1",
    length: "",
    lengthUnit: "1",
    addHead: false,
    headType: "hemihead",
    headCount: 2,
    useManualVolume: false,
    manualVolume: "",
    manualVolumeUnit: "m3",
    equipmentType: "",
    fluidType: "",
    density: "",
    customPercent: "",
    flowRate: "",
    flowRateUnit: "kg/s",
    residenceTime: 180,
    residenceTimeUnit: "s",
    result: "",
  });

  // Generic handler for input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Shape change resets phase
  const handleShapeChange = (e) => {
    const shape = e.target.value;
    setState((prev) => ({
      ...prev,
      shape,
      phase: "",
    }));
  };

  // Phase change updates phase value
  const handlePhaseChange = (e) => {
    setState((prev) => ({
      ...prev,
      phase: e.target.value,
    }));
  };

  // Toggle addHead boolean
  const toggleHeadSelection = () => {
    setState((prev) => ({
      ...prev,
      addHead: !prev.addHead,
    }));
  };

  // Toggle manual volume usage
  const toggleManualVolume = () => {
    setState((prev) => ({
      ...prev,
      useManualVolume: !prev.useManualVolume,
    }));
  };

  // Placeholder for the actual inventory calculation logic
  const calculateInventory = () => {
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
    } = state;

    // Example: Convert diameter and length to meters
    const diameterM = parseFloat(diameter) * parseFloat(diameterUnit);
    const lengthM = parseFloat(length) * parseFloat(lengthUnit);

    // Dummy volume calculation for cylinder without heads
    let volume = 0;
    if (!useManualVolume && shape === "cylinder" && phase !== "vapor") {
      volume = Math.PI * (diameterM / 2) ** 2 * lengthM;
      // Add heads volume if any (simplified example)
      if (addHead && headCount > 0) {
        // For example, hemispherical head volume ~ 1/2 sphere volume
        if (headType === "hemihead") {
          const headVol = (2 / 3) * Math.PI * (diameterM / 2) ** 3;
          volume += headVol * headCount;
        }
        // You can extend for other head types here...
      }
    } else if (useManualVolume) {
      // Convert manual volume to m3 if ft3 selected
      volume = parseFloat(manualVolume);
      if (manualVolumeUnit === "ft3") {
        volume = volume * 0.0283168; // ft3 to m3
      }
    }

    // Example: Calculate mass if density given and liquid phase involved
    let mass = 0;
    if (phase === "liquid" || phase === "both") {
      mass = volume * (parseFloat(density) || 0);
      // Adjust mass by equipment type percentage
      let percent = 1;
      switch (equipmentType) {
        case "COLTOP":
        case "COLMID":
          percent = 0.25;
          break;
        case "COLBTM":
          percent = 0.37;
          break;
        case "DRUM":
        case "HEX":
          percent = 0.5;
          break;
        case "KODRUM":
          percent = 0.1;
          break;
        case "COMP":
          percent = 0;
          break;
        case "PUMP":
        case "PIPE":
          percent = 1;
          break;
        case "REACTOR":
          percent = 0.15;
          break;
        case "custom":
          percent = parseFloat(customPercent) || 0;
          break;
        default:
          percent = 1;
      }
      mass *= percent;
    }

    // Example vapor calculation (simplified)
    let vaporInventory = 0;
    if (phase === "vapor" || phase === "both") {
      // Convert flow rate to kg/s
      let flowKgPerSec = parseFloat(flowRate) || 0;
      switch (flowRateUnit) {
        case "kg/min":
          flowKgPerSec /= 60;
          break;
        case "kg/h":
          flowKgPerSec /= 3600;
          break;
      }

      // Convert residence time to seconds
      let residenceSec = parseFloat(residenceTime) || 0;
      switch (residenceTimeUnit) {
        case "min":
          residenceSec *= 60;
          break;
        case "h":
          residenceSec *= 3600;
          break;
      }

      vaporInventory = flowKgPerSec * residenceSec;
    }

    // Combine results if two-phase
    let totalInventory = 0;
    if (phase === "liquid") totalInventory = mass;
    else if (phase === "vapor") totalInventory = vaporInventory;
    else if (phase === "both") totalInventory = mass + vaporInventory;

    setState((prev) => ({
      ...prev,
      result: `Estimated Inventory: ${totalInventory.toFixed(3)} kg`,
    }));
  };

  return {
    state,
    handleInputChange,
    toggleHeadSelection,
    toggleManualVolume,
    handleShapeChange,
    handlePhaseChange,
    calculateInventory,
  };
}
