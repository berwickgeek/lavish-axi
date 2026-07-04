import assert from "node:assert/strict";
import test from "node:test";

import {
  createTelemetryClient,
  resolveTelemetryConfig,
  initDefaultTelemetry,
  getDefaultTelemetry,
} from "../src/telemetry.js";

// The Guppy fork strips telemetry: no endpoint, no HTTP client, no phone-home.

test("resolveTelemetryConfig always reports telemetry disabled", () => {
  // Even fully "configured", the fork never enables it.
  const configured = resolveTelemetryConfig({
    env: { LAVISH_AXI_UMAMI_WEBSITE_ID: "abc", LAVISH_AXI_UMAMI_HOST: "https://analytics.example" },
    buildHost: "https://analytics.example",
    buildWebsiteID: "abc",
  });
  assert.equal(configured.enabled, false);
  assert.equal(configured.host, "");
  assert.equal(configured.websiteID, "");

  assert.equal(resolveTelemetryConfig({ env: {} }).enabled, false);
});

test("telemetry clients are no-ops that never touch the network or throw", async () => {
  // createTelemetryClient ignores any "enabled" config — always a no-op.
  const client = createTelemetryClient({ enabled: true, host: "https://ignored.example", websiteID: "abc" });
  client.pageview("/open", { command: "open" });
  client.track("command", { command: "open", status: "success" });
  await client.close(1_000);
  assert.ok(true, "no-op client did not throw");
});

test("initDefaultTelemetry returns a usable no-op client", async () => {
  const client = initDefaultTelemetry({ env: { LAVISH_AXI_UMAMI_WEBSITE_ID: "abc" } });
  client.pageview("/design");
  client.track("command", { command: "design" });
  await client.close(10);
  assert.equal(getDefaultTelemetry(), client);
});
