# Bedrock LSP

Stop guessing JSON. Autocomplete and validation for Minecraft Bedrock Add-ons.

Bedrock LSP gives you real-time help while you edit behavior packs and resource packs. If it's valid in-game, it autocompletes. If it's broken, it tells you why before you launch Minecraft.

Works with VS Code, Neovim, Helix, Zed, and any editor that supports LSP.

## What you get

**It knows where you are.**
Open `entities/zombie.json` and you get entity completions. Open `loot_tables` and you get loot table completions. No config needed.

**Autocomplete that actually helps.**
All components, properties, and enum values from the latest Bedrock schemas. No more switching to the wiki.

**Errors before you test in-game.**
Missing property? Wrong type in `minecraft:loot`? You see it instantly as a message in the editor, or a red underline depending on your editor, with a clear message.

**Docs on hover.**
Hover any property to see what it does, what values it accepts, and its defaults. (subject to blockception schemas, I do not take responsibility for wrong or missing hover docs)

**Always up to date.**
Built on the community schemas by Blockception, updated with the latest Bedrock release.

**Fast and offline.**
No internet calls, no heavy dependencies. Runs locally via stdio.

## Supported files

Behavior Packs: entities, items, blocks, recipes, loot tables, spawn rules, trading, features, biomes

Resource Packs: models, textures, sounds, materials, render controllers, attachables

And all other JSON files that Bedrock uses.

## Install

```bash
npm i -g @ajr-uribe/bedrock-lsp
```

Then add it to your editor as a JSON language server with `--stdio`.

*VS Code:* Use any generic LSP client extension and point it to `bedrock-lsp`.

*Neovim / Helix / Zed:* Add `bedrock-lsp --stdio` as a language server for `json` and `jsonc`.

## *Acode:*
  - Open `Settings > Language Servers > Add Custom Server`
  - LSP Info:
    - Server Id: bedrock-lsp
    - Server Label: Choose a Name you like
    - Language IDs: `json, jsonc, material`
    - Chose STDIO (not web worker)
    - Binary command: `bedrock-lsp`
    - Args: `["--stdio"]`
    - Package: `@ajr-uribe/bedrock-lsp`
    - Check command: `which bedrock-lsp`
  - YOU'RE ALL DONE!
  - Pd: It works better if you disable any other Acode's built-in JSON LSPs

## Why use this instead of just JSON schemas?

You could add 60+ schemas by hand to your `settings.json`. This does it for you, automatically picks the right schema based on file path, and stays as a single binary that works everywhere.

Made for Bedrock creators who are tired of silent JSON errors.

## Support

If Bedrock LSP saves you time, consider supporting its development.

<a href="https://ko-fi.com/ajr_uribe" target="_blank">
  <img src="https://storage.ko-fi.com/cdn/kofi5.png" height="36" alt="Support me on Ko-fi" />
</a>

**Ko-fi:** https://ko-fi.com/ajr_uribe

Every donation keeps the schemas updated and the server fast and updated.
