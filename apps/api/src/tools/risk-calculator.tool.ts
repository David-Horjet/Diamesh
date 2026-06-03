export const riskCalculatorToolDefinition = {
  type: "function" as const,
  function: {
    name: "calculate_vision_risk",
    description:
      "Calculate risk scores for common ophthalmic conditions based on clinical parameters. Supports glaucoma risk, diabetic retinopathy progression, and AMD risk assessment.",
    parameters: {
      type: "object" as const,
      properties: {
        condition: {
          type: "string",
          enum: ["glaucoma", "diabetic_retinopathy", "amd"],
          description: "Condition to calculate risk for",
        },
        parameters: {
          type: "object" as const,
          description:
            "Clinical parameters. For glaucoma: iop (mmHg), age, ccт (corneal thickness μm), cdRatio. For diabetic_retinopathy: hba1c, diabetesDurationYears, hypertension. For amd: age, smoking, familyHistory.",
        },
      },
      required: ["condition", "parameters"],
    },
  },
};

export async function executeRiskCalculatorTool(args: {
  condition: string;
  parameters: Record<string, unknown>;
}): Promise<string> {
  switch (args.condition) {
    case "glaucoma":
      return calculateGlaucomaRisk(args.parameters);
    case "diabetic_retinopathy":
      return calculateDRRisk(args.parameters);
    case "amd":
      return calculateAMDRisk(args.parameters);
    default:
      return JSON.stringify({ error: `Unknown condition: ${args.condition}` });
  }
}

function calculateGlaucomaRisk(p: Record<string, unknown>): string {
  const iop = Number(p["iop"] ?? 15);
  const age = Number(p["age"] ?? 50);
  const cct = Number(p["cct"] ?? 545);
  const cdRatio = Number(p["cdRatio"] ?? 0.4);

  let score = 0;
  if (iop > 21) score += 30;
  else if (iop > 18) score += 15;
  if (age > 65) score += 20;
  else if (age > 50) score += 10;
  if (cct < 500) score += 20;
  else if (cct < 530) score += 10;
  if (cdRatio > 0.7) score += 25;
  else if (cdRatio > 0.5) score += 10;

  const risk = score >= 60 ? "high" : score >= 30 ? "moderate" : "low";
  return JSON.stringify({
    condition: "Glaucoma",
    riskScore: score,
    riskLevel: risk,
    interpretation: `${risk.charAt(0).toUpperCase() + risk.slice(1)} risk based on IOP, age, CCT, and C/D ratio. Clinical correlation required.`,
  });
}

function calculateDRRisk(p: Record<string, unknown>): string {
  const hba1c = Number(p["hba1c"] ?? 7);
  const duration = Number(p["diabetesDurationYears"] ?? 5);
  const htn = Boolean(p["hypertension"]);

  let score = 0;
  if (hba1c > 9) score += 35;
  else if (hba1c > 7.5) score += 20;
  if (duration > 15) score += 30;
  else if (duration > 10) score += 20;
  else if (duration > 5) score += 10;
  if (htn) score += 15;

  const risk = score >= 55 ? "high" : score >= 25 ? "moderate" : "low";
  return JSON.stringify({
    condition: "Diabetic Retinopathy Progression",
    riskScore: score,
    riskLevel: risk,
    interpretation: `${risk.charAt(0).toUpperCase() + risk.slice(1)} risk of DR progression. Annual dilated fundus exam recommended.`,
    annualScreeningRequired: true,
  });
}

function calculateAMDRisk(p: Record<string, unknown>): string {
  const age = Number(p["age"] ?? 60);
  const smoking = Boolean(p["smoking"]);
  const familyHistory = Boolean(p["familyHistory"]);

  let score = 0;
  if (age > 75) score += 40;
  else if (age > 65) score += 25;
  else if (age > 55) score += 10;
  if (smoking) score += 25;
  if (familyHistory) score += 20;

  const risk = score >= 60 ? "high" : score >= 30 ? "moderate" : "low";
  return JSON.stringify({
    condition: "Age-Related Macular Degeneration",
    riskScore: score,
    riskLevel: risk,
    interpretation: `${risk.charAt(0).toUpperCase() + risk.slice(1)} AMD risk. Consider AREDS2 supplementation discussion for moderate/high risk.`,
  });
}
