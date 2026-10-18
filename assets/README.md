# Profile artwork

`earthrise.svg` is generated from [Earthrise by bas3line / ascii.rest](https://ascii.rest/earthrise/), using `ascii.rest` 0.4.0 (MIT). The upstream license is preserved in `ascii-rest-LICENSE.txt`.

Regenerate from the repository root with Node.js 18.3+:

```sh
npm ci --ignore-scripts
npm run generate:earthrise
```

The generator samples a four-second, six-fps forward/reverse loop so it returns to the first frame without a cut. The committed SVG needs no JavaScript or external image host, uses the scene's own background in both GitHub themes, and holds its first frame for reduced-motion preferences. Its maximum size is 4 MiB.

## Agent badges

The agent badges use the GitHub organization avatars of [OpenAI](https://github.com/openai), [DeepSeek AI](https://github.com/deepseek-ai), and [Nous Research](https://github.com/NousResearch) to identify their respective tools. These are project-owner logos, not custom product logos or an endorsement. The PNGs are embedded in the SVGs, so viewing the badges requires no third-party image requests.

Regenerate with `node scripts/generate-agent-badges.mjs` (requires network access).
