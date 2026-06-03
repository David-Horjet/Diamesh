import { startQVACProvider, stopQVACProvider } from "@qvac/sdk";
import { auditLog } from "../logging/audit.js";
import { insertP2PSession } from "../db/queries.js";
import type { P2PStatus, StartProviderResponse } from "@diamesh/shared";

interface ProviderState {
  publicKey: string | null;
  sessionId: string | null;
  startedAt: string | null;
  requestsDelegated: number;
  fallbacksTriggered: number;
}

const state: ProviderState = {
  publicKey: null,
  sessionId: null,
  startedAt: null,
  requestsDelegated: 0,
  fallbacksTriggered: 0,
};

export async function startProvider(allowedConsumerKey?: string): Promise<StartProviderResponse> {
  const response = await startQVACProvider({
    firewall: allowedConsumerKey
      ? { mode: "allow", publicKeys: [allowedConsumerKey] }
      : undefined,
  });

  state.publicKey = response.publicKey;
  state.startedAt = new Date().toISOString();
  state.requestsDelegated = 0;
  state.fallbacksTriggered = 0;
  state.sessionId = insertP2PSession(response.publicKey);

  auditLog({
    event: "p2p_provider_started",
    details: { publicKey: response.publicKey },
  });

  return { publicKey: response.publicKey, startedAt: state.startedAt };
}

export async function stopProvider(): Promise<void> {
  await stopQVACProvider();
  auditLog({ event: "p2p_provider_stopped", details: { publicKey: state.publicKey } });
  state.publicKey = null;
  state.sessionId = null;
  state.startedAt = null;
}

export function getProviderStatus(): P2PStatus {
  return {
    mode: state.publicKey ? "provider" : "idle",
    publicKey: state.publicKey,
    connectedPeerKey: null,
    isConnected: !!state.publicKey,
    requestsDelegated: state.requestsDelegated,
    fallbacksTriggered: state.fallbacksTriggered,
    startedAt: state.startedAt,
  };
}

export function incrementDelegated(): void {
  state.requestsDelegated++;
}

export function incrementFallback(): void {
  state.fallbacksTriggered++;
}
