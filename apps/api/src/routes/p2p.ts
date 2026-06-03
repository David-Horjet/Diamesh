import { Router } from "express";
import { z } from "zod";
import {
  startProvider,
  stopProvider,
  getProviderStatus,
} from "../p2p/provider.js";
import {
  setPeerKey,
  clearPeerKey,
  getConsumerStatus,
} from "../p2p/consumer.js";

const router = Router();

// GET /api/p2p/status
router.get("/status", (_req, res) => {
  const provider = getProviderStatus();
  const consumer = getConsumerStatus();
  // Merge: if we're acting as provider, return provider status; else consumer
  const status = provider.isConnected ? provider : consumer;
  res.json({ success: true, data: status });
});

// POST /api/p2p/provider/start
router.post("/provider/start", async (req, res) => {
  try {
    const schema = z.object({ allowedConsumerKey: z.string().optional() });
    const { allowedConsumerKey } = schema.parse(req.body);
    const result = await startProvider(allowedConsumerKey);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// POST /api/p2p/provider/stop
router.post("/provider/stop", async (_req, res) => {
  try {
    await stopProvider();
    res.json({ success: true, data: { stopped: true } });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// POST /api/p2p/consumer/connect
router.post("/consumer/connect", (req, res) => {
  try {
    const schema = z.object({ providerPublicKey: z.string().min(1) });
    const { providerPublicKey } = schema.parse(req.body);
    setPeerKey(providerPublicKey);
    res.json({ success: true, data: { connected: true, providerPublicKey } });
  } catch (err) {
    res.status(400).json({ success: false, error: String(err) });
  }
});

// POST /api/p2p/consumer/disconnect
router.post("/consumer/disconnect", (_req, res) => {
  clearPeerKey();
  res.json({ success: true, data: { disconnected: true } });
});

export default router;
