// /pages/api/process-piping-calc.js (Next.js API route example)

const yTable = {
  ferritic: { "482": 0.4, "510": 0.5, "538": 0.7, "566": 0.7, "593": 0.7, "621": 0.7, "649": 0.7, "677": 0.7 },
  austenitic: { "482": 0.4, "510": 0.4, "538": 0.4, "566": 0.4, "593": 0.5, "621": 0.7, "649": 0.7, "677": 0.7 },
  nickel: { "482": 0.4, "510": 0.4, "538": 0.4, "566": 0.4, "593": 0.4, "621": 0.4, "649": 0.5, "677": 0.7 },
  grayiron: { "482": 0.0, "510": 0.0, "538": 0.0, "566": 0.0, "593": 0.0, "621": 0.0, "649": 0.0, "677": 0.0 },
  other: { "482": 0.4, "510": 0.4, "538": 0.4, "566": 0.4, "593": 0.4, "621": 0.4, "649": 0.4, "677": 0.4 }
};

const millToleranceMap = {
  "A53": { type: "%", value: 0.125 },           // -12.5%
  "A106": { type: "%", value: 0.125 },
  "A134": { type: "%", value: 0.125 },
  "A135/A135M": { type: "%", value: 0.125 },
  "A312/A312M": { type: "%", value: 0.125 },
  "A358/A358M": { type: "mm", value: 0.3 },
  "A409/A409M": { type: "mm", value: 0.46 },
  "A451/A451M": { type: "%", value: 0 },
  "A524": { type: "%", value: 0.125 },
  "A530/A530M": { type: "%", value: 0.125 },
  "A587": { type: "%", value: 0.125 },
  "A600/A600M": { type: "mm", value: 0 },
  "A671/A671M": { type: "mm", value: 0.3 },
  "A672/A672M": { type: "mm", value: 0.3 },
  "A691/A691M": { type: "mm", value: 0.3 },
  "A731/A731M": { type: "%", value: 0.125 },
  "A335/A335M": { type: "%", value: 0.125 },
  "A790/A790M": { type: "%", value: 0.125 },

  "IS-3589 (SAW & Seamless Pipe)": { type: "%", value: 0.125 },
  "IS-3589 (ERW Pipe)": { type: "%", value: 0.10 },
  "IS-1239 (Welded: Light Tubes)": { type: "%", value: 0.08 },
  "IS-1239 (Welded: Medium/Heavy)": { type: "%", value: 0.10 },
  "IS-1239 (Seamless)": { type: "%", value: 0.125 }
};

function getMillTolerance(material, t_nom) {
  const mt = millToleranceMap[material];

  if (mt && material.indexOf("API 5L") === -1) {
    if (mt.type === "%") {
      return t_nom * mt.value;
    } else if (mt.type === "mm") {
      return mt.value;
    }
  }

  if (material === "API 5L (Seamless)") {
    if (t_nom <= 4.0) return 0.5;
    if (t_nom > 4.0 && t_nom < 25.0) return 0.125 * t_nom;
    if (t_nom >= 25.0) return 0.1 * t_nom;
  }

  if (material === "API 5L (Welded Pipe)") {
    if (t_nom <= 5.0) return 0.5;
    if (t_nom > 5.0 && t_nom < 15.0) return 0.1 * t_nom;
    if (t_nom >= 15.0) return 1.5;
  }

  return 0;
}

function convertPressureToMPa(P, unit) {
  if (isNaN(P)) return NaN;
  switch (unit) {
    case "kgcm2": return P * 0.0980665;
    case "bar": return P * 0.1;
    case "psi": return P * 0.00689476;
    case "MPa": return P;
    default: return NaN;
  }
}

function convertStressToMPa(S, unit) {
  if (isNaN(S)) return NaN;
  switch (unit) {
    case "ksi": return S * 6.89476;
    case "kgcm2": return S * 0.0980665;
    case "psi": return S * 0.00689476;
    case "MPa": return S;
    default: return NaN;
  }
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      pressure, pressureUnit,
      diameter,
      stress, stressUnit,
      efficiency,
      yMaterial, yFactorValue,
      highTemp, wFactorValue,
      includeCA, corrosionAllowance,
      includeMillTol,
      materialStd,
      nominalThickness,
      userEditedNominal
    } = req.body;

    // Convert pressure & stress to MPa
    const P = convertPressureToMPa(parseFloat(pressure), pressureUnit);
    const D = parseFloat(diameter);
    const S = convertStressToMPa(parseFloat(stress), stressUnit);
    const E = parseFloat(efficiency);
    const Y = parseFloat(yFactorValue);
    const W = highTemp === "yes" ? parseFloat(wFactorValue) : 1.0;
    const CA = includeCA === "yes" ? (parseFloat(corrosionAllowance) || 0) : 0;
    const t_nom_input = parseFloat(nominalThickness);
    const userEdited = userEditedNominal === true || userEditedNominal === "true";

    // Validation
    if ([P, D, S, E, Y, W].some(v => isNaN(v))) {
      return res.status(400).json({ error: "Invalid or missing numeric inputs" });
    }

    // Step 1: Design Thickness
    const t_design = (P * D) / (2 * (S * E * W + P * Y));

    // Step 2: Nominal Thickness
    let nominalVal = userEdited && !isNaN(t_nom_input) ? t_nom_input : t_design;

    // Step 3: Required Thickness (Nominal + CA)
    const t_req = nominalVal + CA;

    // Step 4: Mill Tolerance
    let t_afterMill = nominalVal;
    let millTolVal = 0;
    let t_includingCA_Mill = nominalVal;

    if (includeMillTol === "yes" && materialStd) {
      millTolVal = getMillTolerance(materialStd, nominalVal);

      if (materialStd === "API 5L (Seamless)" || materialStd === "API 5L (Welded Pipe)") {
        t_afterMill = nominalVal - millTolVal;
        t_includingCA_Mill = Math.max(nominalVal - millTolVal - CA, 0);
      } else {
        t_afterMill = nominalVal - millTolVal;
        t_includingCA_Mill = Math.max(t_afterMill - CA, 0);
      }
    }

    // Prepare mill tolerance display format
    const millTolType = millToleranceMap[materialStd]?.type || "%";
    const millTolDisplay = (materialStd?.indexOf("API 5L") !== -1 || millTolType === "mm")
      ? millTolVal.toFixed(2) + " mm"
      : nominalVal > 0 ? ((millTolVal / nominalVal) * 100).toFixed(1) + " %" : millTolVal.toString();

    // Result breakdown for UI
    const result = {
      designThickness: t_design,
      nominalThickness: nominalVal,
      corrosionAllowance: CA,
      requiredThickness: t_req,
      millTolerance: millTolVal,
      millToleranceDisplay: millTolDisplay,
      thicknessAfterMillTolerance: t_afterMill,
      thicknessIncludingCAAfterMillTolerance: t_includingCA_Mill,
      inputsUsed: {
        pressure: { raw: pressure, value: P.toFixed(3) + " MPa" },
        pressureUnit,
        diameter: { raw: diameter, value: D.toFixed(2) + " mm" },
        stress: { raw: stress, value: S.toFixed(2) + " MPa" },
        stressUnit,
        efficiency: E,
        yFactor: Y,
        wFactor: W,
        highTemp,
        includeCA,
        corrosionAllowance: CA,
        includeMillTol,
        materialStd,
        nominalThickness: nominalVal,
        userEditedNominal: userEdited
      }
    };

    return res.status(200).json({ result });
  } catch (error) {
    console.error("Calculation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
