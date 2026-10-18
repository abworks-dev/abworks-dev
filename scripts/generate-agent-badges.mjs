import { mkdirSync, writeFileSync } from "node:fs";

// Project-owner avatars identify the tools without inventing unofficial logos.
// Embed the PNGs so the committed badges have no external image dependencies.
const badges = [
  { name: "OpenAI Codex", owner: "openai", file: "codex", width: 148 },
  { name: "DeepSeek Harness", owner: "deepseek-ai", file: "deepseek-harness", width: 180 },
  { name: "Hermes Agent", owner: "NousResearch", file: "hermes-agent", width: 148 },
];
const assets = new URL("../assets/", import.meta.url);
mkdirSync(assets, { recursive: true });

for (const badge of badges) {
  const response = await fetch(`https://github.com/${badge.owner}.png?size=64`);
  if (!response.ok) throw new Error(`Avatar request failed: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    throw new Error(`Expected PNG avatar for ${badge.owner}`);
  }
  const image = bytes.toString("base64");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${badge.width}" height="28" viewBox="0 0 ${badge.width} 28" role="img" aria-label="${badge.name}"><title>${badge.name}</title><rect width="${badge.width}" height="28" rx="4" fill="#161b22"/><image x="6" y="5" width="18" height="18" xlink:href="data:image/png;base64,${image}"/><text x="32" y="18" fill="#f0f6fc" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">${badge.name}</text></svg>\n`;
  writeFileSync(new URL(`${badge.file}-badge.svg`, assets), svg);
  console.log(`Generated ${badge.file}-badge.svg`);
}
