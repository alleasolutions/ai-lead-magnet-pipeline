# AI Lead Magnet Pipeline (Alle A Solutions)

One-command funnel system: `/lead-magnet` researches a topic and drafts it in Notion → you review and set Status to "Execute" → `/execute-lead-magnets` builds the landing page, delivery email, and (optionally) PDF, then deploys.

## What's already built

- `.claude/commands/lead-magnet.md` — `/lead-magnet [topic]`: researches a topic and creates the Notion content page + pipeline entry.
- `.claude/commands/landing-page.md` — `/landing-page [topic]`: builds a standalone landing page for a topic (used directly, or as the template `/execute-lead-magnets` follows).
- `.claude/commands/execute-lead-magnets.md` — `/execute-lead-magnets`: batch-processes every Notion pipeline item with Status = "Execute".
- `lead-magnet-system/reference/conversion-landing-sample.html` — the design system every generated landing page matches (Manrope/Inter fonts, light/dark theme, sticky form card).
- `lead-magnet-system/scripts/generate-pdf.js` — Puppeteer script: `node lead-magnet-system/scripts/generate-pdf.js <input.html> <output.pdf>`.
- Notion "Lead Magnet Pipeline" database — created via the Notion MCP connector. Data Source ID `32a9ea0f-1932-40d4-b5a0-9b31f0b407e4` (already baked into the two commands above that need it).
- `package.json` — declares and installs the `puppeteer` dependency (Node v24.19.0 + npm 11.17.0 confirmed installed; `node_modules` present; PDF generation tested successfully end-to-end).
- Git repo initialized locally (not yet committed or pushed — see below).

## Still needed from you before the pipeline is fully live

1. **Real brand assets for the reference landing page**: swap `[YOUR_PHOTO_URL]`, `[Your Name]`, the `[X]+ clients` copy, and the CSS color variables in `lead-magnet-system/reference/conversion-landing-sample.html` if you want different branding than the current defaults (indigo/amber palette, Manrope + Inter).
2. **CRM/email webhook URL**: every generated landing page currently POSTs to the literal placeholder string `[YOUR_WEBHOOK_URL]`, which intentionally fails until replaced. Once you have a Go High Level / ConvertKit / Beehiiv / Mailchimp webhook, tell me the URL and I'll bake it into `.claude/commands/landing-page.md`, `.claude/commands/execute-lead-magnets.md`, and the reference HTML so every future page uses it automatically.
3. **GitHub remote**: this repo has no remote yet. When you're ready, create a GitHub repo and I can add it as `origin` (I'll ask before pushing anything, per your standing instructions).
4. **Vercel**: `vercel link` requires an interactive browser login, so you'll need to run that yourself once — `npm install -g vercel` then `vercel link` from this folder. After that, every `git push` auto-deploys.
5. **Initial commit**: nothing has been committed yet. Say the word and I'll make the first commit.

Note: this shell's `PATH` didn't pick up the new Node.js install until refreshed from the registry. If a fresh terminal ever reports `node`/`npm` as not found right after installing, restart the terminal (or reload `PATH` from `HKLM`/`HKCU` env vars) rather than reinstalling.

## Testing the pipeline

Once the above is in place:

```
/lead-magnet [test topic]
```

Review the Notion content page it creates, set Format (Notion/PDF/Both) and Status to "Execute" in Notion, then:

```
/execute-lead-magnets
```
