export type P2PMode = "provider" | "consumer" | "idle";

export interface P2PStatus {
  mode: P2PMode;
  publicKey: string | null;
  connectedPeerKey: string | null;
  isConnected: boolean;
  requestsDelegated: number;
  fallbacksTriggered: number;
  startedAt: string | null;
}

export interface P2PSession {
  id: string;
  providerKey: string;
  connectedAt: string;
  requestsDelegated: number;
  fallbacksTriggered: number;
}

export interface StartProviderResponse {
  publicKey: string;
  startedAt: string;
}

export interface ConnectPeerInput {
  providerPublicKey: string;
}
