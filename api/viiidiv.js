export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { type, values } = req.body;

  // conversions
  const convertPressureToMPa = (value, unit) => {
    switch (unit) {
      case "bar": return value * 0.1;
      case "kgcm2": return value * 0.0980665;
      case "psi": return value * 0.00689476;
      default: return value; // MPa
    }
  };
  const convertStressToMPa = (value, unit) => {
    switch (unit) {
      case "kgcm2": return value * 0.0980665;
      case "psi": return value * 0.00689476;
      case "ksi": return value * 6.89476;
      default: return value; // MPa
    }
  };
  const convertLengthToMM = (value, unit) =>
    unit === "inch" ? value * 25.4 : value;

  // ✅ validate numeric inputs only
  const numericFields = ["P", "R", "D", "S", "E"];
  for (const field of numericFields) {
    if (values[field] !== undefined) {
      const num = parseFloat(values[field]);
      if (isNaN(num) || num <= 0) {
        return res.status(400).json({ error: `Invalid value for ${field}` });
      }
    }
  }

  let t = 0;

  try {
    if (type === "shell") {
      const P = convertPressureToMPa(values.P, values.Punit);
      const R = convertLengthToMM(values.R, values.Runit);
      const S = convertStressToMPa(values.S, values.Sunit);
      const E = Number(values.E);

      if (S * E <= 0.6 * P) throw new Error("Invalid denominator for shell");
      t = (P * R) / (S * E - 0.6 * P);
    }
    else if (type === "ellipsoidal") {
      const P = convertPressureToMPa(values.P, values.Punit);
      const D = convertLengthToMM(values.D, values.Dunit);
      const S = convertStressToMPa(values.S, values.Sunit);
      const E = Number(values.E);

      if (2 * S * E <= 0.2 * P) throw new Error("Invalid denominator for ellipsoidal");
      t = (P * D) / (2 * S * E - 0.2 * P);
    }
    else if (type === "torispherical") {
      const P = convertPressureToMPa(values.P, values.Punit);
      const D = convertLengthToMM(values.D, values.Dunit);
      const S = convertStressToMPa(values.S, values.Sunit);
      const E = Number(values.E);

      if (S * E <= 0.1 * P) throw new Error("Invalid denominator for torispherical");
      t = (0.885 * P * D) / (S * E - 0.1 * P);
    }
    else if (type === "hemispherical") {
      const P = convertPressureToMPa(values.P, values.Punit);
      const D = convertLengthToMM(values.D, values.Dunit);
      const S = convertStressToMPa(values.S, values.Sunit);
      const E = Number(values.E);

      if (2 * S * E <= 0.2 * P) throw new Error("Invalid denominator for hemispherical");
      t = (P * D) / (2 * S * E - 0.2 * P);
    }

    res.status(200).json({ thickness: t.toFixed(2), unit: "mm" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
