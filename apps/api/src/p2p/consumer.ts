import { loadModel } from "@qvac/sdk";
import { MODELS } from "../models/constants.js";
import { auditLog } from "../logging/audit.js";
import type { P2PStatus } from "@diamesh/shared";

interface ConsumerState {
  providerPublicKey: string | null;
  connectedAt: string | null;
  requestsDelegated: number;
  fallbacksTriggered: number;
}

const state: ConsumerState = {
  providerPublicKey: null,
  connectedAt: null,
  requestsDelegated: 0,
  fallbacksTriggered: 0,
};

export function setPeerKey(providerPublicKey: string): void {
  state.providerPublicKey = providerPublicKey;
  state.connectedAt = new Date().toISOString();
  state.requestsDelegated = 0;
  state.fallbacksTriggered = 0;
  auditLog({ event: "p2p_peer_configured", details: { providerPublicKey } });
}

export function clearPeerKey(): void {
  auditLog({ event: "p2p_peer_disconnected", details: { providerPublicKey: state.providerPublicKey } });
  state.providerPublicKey = null;
  state.connectedAt = null;
}

export function getPeerKey(): string | null {
  return state.providerPublicKey;
}

// Loads a model with delegation if a peer key is configured.
// Always sets fallbackToLocal: true so the system works offline.
export async function loadDelegatedModel(
  modelKey: keyof typeof MODELS,
  modelConfig?: Record<string, unknown>
): Promise<{ modelId: string; inferenceMode: "local" | "delegated" }> {
  const modelSrc = MODELS[modelKey];

  if (state.providerPublicKey) {
    try {
      const modelId = await loadModel({
        modelSrc,
        modelType: "llamacpp-completion",
        ...(modelConfig ? { modelConfig } : {}),
        delegate: {
          providerPublicKey: state.providerPublicKey,
          timeout: 60_000,
          fallbackToLocal: true,
        },
      });

      state.requestsDelegated++;
      auditLog({
        event: "p2p_inference_delegated",
        details: { model: modelKey, providerPublicKey: state.providerPublicKey },
      });

      return { modelId, inferenceMode: "delegated" };
    } catch {
      state.fallbacksTriggered++;
      auditLog({
        event: "p2p_delegation_fallback",
        details: { model: modelKey, reason: "delegation failed" },
      });
    }
  }

  const modelId = await loadModel({
    modelSrc,
    modelType: "llamacpp-completion",
    ...(modelConfig ? { modelConfig } : {}),
  });

  return { modelId, inferenceMode: "local" };
}

export function getConsumerStatus(): P2PStatus {
  return {
    mode: state.providerPublicKey ? "consumer" : "idle",
    publicKey: null,
    connectedPeerKey: state.providerPublicKey,
    isConnected: !!state.providerPublicKey,
    requestsDelegated: state.requestsDelegated,
    fallbacksTriggered: state.fallbacksTriggered,
    startedAt: state.connectedAt,
  };
}
