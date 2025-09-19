// pages/api/calculate-thickness.js

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;
  const {
    P, D, S, E, Y, W, CA, material, t_nom, includeMillTol
  } = data;

  if (
    isNaN(P) || isNaN(D) || isNaN(S) || isNaN(E) ||
    isNaN(Y) || isNaN(W) || isNaN(t_nom)
  ) {
    return res.status(400).json({ error: "Invalid or missing input values" });
  }

  // Mill Tolerance Map
  const millToleranceMap = {
    "A106": { type: "%", value: 0.125 },
    "API 5L (Seamless)": { type: "api5l-seamless" },
    "API 5L (Welded Pipe)": { type: "api5l-welded" }
    // Add more as needed
  };

  function getMillTolerance(material, t_nom) {
    const mt = millToleranceMap[material];
    if (!mt) return 0;

    if (mt.type === "%") return t_nom * mt.value;
    if (mt.type === "mm") return mt.value;

    if (mt.type === "api5l-seamless") {
      if (t_nom <= 4) return 0.5;
      if (t_nom < 25) return 0.125 * t_nom;
      return 0.1 * t_nom;
    }

    if (mt.type === "api5l-welded") {
      if (t_nom <= 5) return 0.5;
      if (t_nom < 15) return 0.1 * t_nom;
      return 1.5;
    }

    return 0;
  }

  // 1. Design Thickness
  const t_design = (P * D) / (2 * (S * E * W + P * Y));

  // 2. Auto Nominal Thickness if not passed
  const t_nom_final = isNaN(t_nom) ? t_design : t_nom;
  const t_req = t_nom_final + (CA || 0);

  // 3. Mill Tolerance
  let millTol = 0;
  let t_afterMill = t_nom_final;
  let t_includingCA_Mill = t_req;

  if (includeMillTol && material) {
    millTol = getMillTolerance(material, t_nom_final);
    t_afterMill = t_nom_final - millTol;
    t_includingCA_Mill = Math.max(t_afterMill - CA, 0);
  }

  res.status(200).json({
    t_design: +t_design.toFixed(2),
    t_nom: +t_nom_final.toFixed(2),
    t_req: +t_req.toFixed(2),
    millTol: +millTol.toFixed(3),
    t_afterMill: +t_afterMill.toFixed(4),
    t_includingCA_Mill: +t_includingCA_Mill.toFixed(4)
  });
}
