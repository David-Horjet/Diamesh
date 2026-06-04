import { executeIcd10Tool, icd10ToolDefinition } from "./icd10.tool.js";
import { executeDrugInteractionTool, drugInteractionToolDefinition } from "./drug-interaction.tool.js";
import { executeRagSearchTool, ragSearchToolDefinition } from "./rag-search.tool.js";
import { executeRiskCalculatorTool, riskCalculatorToolDefinition } from "./risk-calculator.tool.js";
import type { PromptTool } from "./prompt-tools.js";
import type { ToolCallRecord } from "@diamesh/shared";

export const ALL_TOOLS: PromptTool[] = [
  icd10ToolDefinition,
  drugInteractionToolDefinition,
  ragSearchToolDefinition,
  riskCalculatorToolDefinition,
];

export const REASONING_TOOLS: PromptTool[] = [
  icd10ToolDefinition,
  ragSearchToolDefinition,
  riskCalculatorToolDefinition,
];

export const DIFFERENTIAL_TOOLS: PromptTool[] = [
  icd10ToolDefinition,
  riskCalculatorToolDefinition,
];

export const INTAKE_TOOLS: PromptTool[] = [
  ragSearchToolDefinition,
];

// Dispatch a tool call by name, returning result string + timing
export async function dispatchTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ result: string; durationMs: number }> {
  const start = Date.now();
  let result: string;

  switch (name) {
    case "icd10_lookup":
      result = await executeIcd10Tool(args as { condition: string });
      break;
    case "drug_interaction_check":
      result = await executeDrugInteractionTool(args as { medication: string });
      break;
    case "search_medical_knowledge":
      result = await executeRagSearchTool(args as { query: string; topK?: number });
      break;
    case "calculate_vision_risk":
      result = await executeRiskCalculatorTool(
        args as { condition: string; clinical_params?: string }
      );
      break;
    default:
      result = JSON.stringify({ error: `Unknown tool: ${name}` });
  }

  return { result, durationMs: Date.now() - start };
}

export type { ToolCallRecord };
