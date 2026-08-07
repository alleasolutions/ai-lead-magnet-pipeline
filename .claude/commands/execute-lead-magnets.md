# Execute Lead Magnets from Notion

Query the Notion Lead Magnet Pipeline database for items with status "Execute", then build the marketing assets for each one.

## Design System
Read these before building anything:
- lead-magnet-system/reference/conversion-landing-sample.html

## Notion Database Info
- **Data Source ID:** `32a9ea0f-1932-40d4-b5a0-9b31f0b407e4`

---

## Pipeline:

### Step 1: Query Notion for "Execute" Items
Fetch the pipeline database and find all entries where Status = "Execute".

For each item, extract:
- Name, Topic, Slug, Format, Notion URL, Page ID

If no items have status "Execute", inform the user and stop.

### Step 2: Update Status to "In Progress"
For each item, immediately update its status to "In Progress".

### Step 3: Build Assets Based on Format

#### Format = "Notion" (default)
The deliverable is the Notion page. Build marketing assets only:
1. Research the topic (for landing page copy)
2. Build the landing page at `website/lead-magnets/[slug].html` (follow the same design system and webhook integration rules as `/landing-page`)
3. Write the delivery email at `website/lead-magnets/[slug]-email.txt`
   - Include the Notion URL as the deliverable link

#### Format = "PDF"
The deliverable is a downloadable PDF:
1. Read content from the linked Notion page
2. Research the topic (for landing page copy)
3. Build a PDF-formatted HTML at `website/lead-magnets/[slug]-pdf.html`
4. Build the landing page at `website/lead-magnets/[slug].html`
5. Generate the PDF via Puppeteer: `node lead-magnet-system/scripts/generate-pdf.js website/lead-magnets/[slug]-pdf.html website/lead-magnets/[slug].pdf`
6. Write the delivery email referencing the attached PDF

#### Format = "Both"
Follow the PDF pipeline, but the email references both the PDF and the Notion page link.

### Step 4: Update Notion
Set Status to "Complete" for each processed item, and fill in the **Landing URL** property once the page is deployed.

### Step 5: Deploy
Stage all new files, commit, and push to deploy — but confirm with the user before pushing, since it triggers a live Vercel deployment.

### Step 6: Summary
For each item: title, format, files created, and remind user to paste the email into their CRM automation
