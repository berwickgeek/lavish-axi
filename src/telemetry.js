/**
 * Telemetry — STRIPPED in the Guppy fork.
 *
 * Upstream Lavish ships optional Umami analytics (CLI pageviews + command events sent
 * to the author's endpoint). Guppy's fork removes the phone-home entirely: there is no
 * endpoint, no HTTP client, and no build-time analytics id is honoured — every client
 * is a no-op and no network is ever contacted. The exported surface is kept unchanged
 * so callers (cli.js) and tests don't need to know telemetry is gone.
 */

class NoopTelemetryClient {
  pageview(_path, _data) {}
  track(_event, _data) {}
  async close(_timeoutMs) {}
}

export function resolveTelemetryConfig(_input) {
  // The Guppy fork never enables telemetry, whatever the env or build-time values.
  return { enabled: false, host: "", websiteID: "" };
}

export function getBuildTimeUmamiHost() {
  return "";
}

export function getBuildTimeUmamiWebsiteID() {
  return "";
}

export function createTelemetryClient(_config) {
  return new NoopTelemetryClient();
}

let defaultClient = new NoopTelemetryClient();

export function initDefaultTelemetry(_init) {
  defaultClient = new NoopTelemetryClient();
  return defaultClient;
}

export function getDefaultTelemetry() {
  return defaultClient;
}

export function resetDefaultTelemetryForTests() {
  defaultClient = new NoopTelemetryClient();
}
