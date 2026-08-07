# Landing Page Generator

Generate a conversion-optimized opt-in landing page for: **$ARGUMENTS**

## Design System
Read these before building anything:
- lead-magnet-system/reference/conversion-landing-sample.html

The reference file is the exact visual pattern to match: colors, spacing, typography (Manrope for headings, Inter for body — both via Google Fonts), and layout. Match it exactly rather than inventing a new look.

---

## Pipeline:

### Step 1: Research the Topic
Use web search to research "$ARGUMENTS". Find:
- Core value proposition and what makes this topic compelling
- 3-5 specific pain points the audience faces
- Concrete outcomes/benefits to feature in copy
- Any relevant stats or social proof angles

Flag any stat or claim you cannot verify as an assumption rather than presenting it as fact.

### Step 2: Build the Landing Page
Create the landing page at `website/lead-magnets/[slug].html`.

Requirements:
- Pure CSS with variables (no Tailwind CDN) — copy the `:root` variable system from the reference file
- Fonts: Manrope (headings) + Inter (body) via Google Fonts, matching the reference file's `<link>` tags
- Full light/dark theme support with localStorage persistence (copy the theme-toggle script from the reference file)
- Accessible: contrast ratios, alt text, focus states

Sections in order:
1. **Nav Bar** — fixed, blur backdrop, logo ("Alle A Solutions") + theme toggle
2. **Hero** — trust bar (photo + name + follower/client count), eyebrow "FREE DOWNLOAD", H1 headline, subhead, value pills, benefits list
3. **Form Card** — name input, email input, optional qualifying dropdown, submit button, micro-trust icons (no spam, unsubscribe anytime, instant delivery)
4. **FAQ Section** — 3-4 questions specific to the topic
5. **Final CTA Card** — inverted card with heading + button
6. **Footer** — copyright line ("Alle A Solutions")

Form Integration:
- Webhook URL: `https://alleasolutions.twenty.com/webhooks/workflows/db05b54c-c82c-4951-9d2e-60dd1cd9bbd1/0e6476e1-d960-4f65-ad37-d1d74ccc9c5e` — a Twenty CRM workflow webhook trigger ("Website form submission" workflow). Verified working end-to-end (webhook receipt + Person record creation).
- This webhook expects a **JSON body**, not FormData: `{ name, email, qualifier, source }` where `source` is the lead magnet's slug.
- JavaScript: validate fields, `fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, qualifier, source }) })`, show success state (copy the exact pattern from the reference file)

### Step 3: Write Delivery Email
Write the plain text delivery email. Save to `website/lead-magnets/[slug]-email.txt`.

Structure:
- Subject line (short, specific to the topic)
- Hey {{contact.first_name}},
- Opening: 1-2 sentences about what they are getting
- Middle: why this content is valuable
- Closing: tell them to follow Alle A Solutions for more content
- Sign off with "Alle A Solutions"
- PS: invite them to reply with questions

Voice: direct, practical, no fluff — same as the lead magnet content.

### Step 4: Deploy
1. `git add website/lead-magnets/[slug].html website/lead-magnets/[slug]-email.txt`
2. `git commit -m "Add [title] lead magnet landing page"`
3. `git push`

Before pushing, confirm with the user — pushing affects the shared remote and (once Vercel is connected) triggers a live deploy.

### Step 5: Summary
Output: page title, slug, files created, live URL (once deployed), and:
- Remind the user to paste the email into their CRM automation
