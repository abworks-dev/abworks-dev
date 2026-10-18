import { mkdirSync, writeFileSync } from "node:fs";
import { svg } from "ascii.rest/svg";
import { earthrise } from "ascii.rest/pieces";

// Earthrise has no natural short loop. Gently reverse time for a seamless
// four-second loop, reusing identical frames to keep the README asset small.
const piece = {
  ...earthrise,
  frame(t, options) {
    const phase = t % 4;
    const time = Math.round((phase <= 2 ? phase : 4 - phase) * 6) / 6;
    return earthrise.frame(time, options);
  },
};

const image = svg(piece, {
  seconds: 4,
  fps: 6,
  scale: 4,
  budget: 4 * 1024 * 1024,
  label: "Earthrise — Earth above a cratered lunar horizon, in animated ASCII art",
});

if (Buffer.byteLength(image) > 4 * 1024 * 1024) {
  throw new Error("Earthrise exceeds the 4 MiB README asset budget");
}

const assets = new URL("../assets/", import.meta.url);
mkdirSync(assets, { recursive: true });
writeFileSync(new URL("earthrise.svg", assets), image);
console.log(`Generated assets/earthrise.svg (${(Buffer.byteLength(image) / 1024).toFixed(0)} KiB)`);
