# AI4Life Tutorials

This repo hosts **AI4Life Tutorials & Talks**, auto-updated from GitHub Issues.

## 🚀 How to add new tutorial/talk
1. Open a new **Issue**.
2. Paste links with inline tags. Example:

```
https://www.youtube.com/watch?v=abc123 #type:tutorial #domain:genomics #level:intro #year:2024
https://youtu.be/xyz456 #type:talk #domain:medicine #level:advanced
```

3. GitHub Action will parse and update `tutorials.json` automatically.
4. GitHub Pages will deploy the updated site.

## 🔍 Features
- Card-based UI (like papers repo)
- Search + filter by domain, type, level, year
- Auto-fetch via JSON
