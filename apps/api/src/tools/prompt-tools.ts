// Prompt-based tool calling — model-agnostic, does not rely on the GGUF chat
// template having a native tool-call section (which MedPsy's template lacks).
//
// We describe tools in the system prompt and ask the model to emit a JSON
// block when it wants to call one. We parse that block, run the tool, and feed
// the result back as a follow-up user message.

export interface PromptTool {
  type: "function";
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, { type: string; description: string }>;
    required: string[];
  };
}

export interface ParsedToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

/**
 * Build a system-prompt section describing the available tools and the exact
 * format the model must use to call one.
 */
export function buildToolInstructions(tools: PromptTool[]): string {
  if (tools.length === 0) return "";

  const toolDescriptions = tools
    .map((t) => {
      const params = Object.entries(t.parameters.properties)
        .map(([name, p]) => {
          const required = t.parameters.required.includes(name) ? " (required)" : " (optional)";
          return `    - ${name} (${p.type})${required}: ${p.description}`;
        })
        .join("\n");
      return `• ${t.name}: ${t.description}\n  Parameters:\n${params}`;
    })
    .join("\n\n");

  return `

You have access to the following tools:

${toolDescriptions}

To use a tool, respond with ONLY a JSON object on its own line in this exact format:
{"tool_call": {"name": "tool_name", "arguments": {"param": "value"}}}

After you receive the tool result, continue your analysis. You may call tools multiple times.
When you have everything you need, provide your final answer WITHOUT any tool_call JSON.
If you do not need any tools, just answer directly.`;
}

/**
 * Try to parse a tool call from the model's text output.
 * Returns null if no valid tool call is present.
 */
export function parseToolCall(text: string): ParsedToolCall | null {
  // Look for a {"tool_call": ...} JSON object anywhere in the text
  const match = text.match(/\{\s*"tool_call"\s*:\s*\{[\s\S]*?\}\s*\}/);
  if (!match) return null;

  try {
    const parsed = JSON.parse(match[0]) as { tool_call?: { name?: string; arguments?: Record<string, unknown> } };
    const call = parsed.tool_call;
    if (!call || typeof call.name !== "string") return null;
    return {
      name: call.name,
      arguments: call.arguments ?? {},
    };
  } catch {
    return null;
  }
}

/**
 * Strip any tool_call JSON from the text so it doesn't leak into the final
 * assistant output shown to the user.
 */
export function stripToolCallJson(text: string): string {
  return text.replace(/\{\s*"tool_call"\s*:\s*\{[\s\S]*?\}\s*\}/g, "").trim();
}
