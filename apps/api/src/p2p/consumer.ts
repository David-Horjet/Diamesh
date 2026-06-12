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

// Called by models/pool.ts after a delegated loadModel() succeeds.
export function recordDelegationSuccess(modelKey: keyof typeof MODELS): void {
  state.requestsDelegated++;
  auditLog({
    event: "p2p_inference_delegated",
    details: { model: modelKey, providerPublicKey: state.providerPublicKey },
  });
}

// Called by models/pool.ts when a delegated loadModel() throws and we fall
// back to loading the model locally.
export function recordDelegationFallback(modelKey: keyof typeof MODELS, reason: string): void {
  state.fallbacksTriggered++;
  auditLog({ event: "p2p_delegation_fallback", details: { model: modelKey, reason } });
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
