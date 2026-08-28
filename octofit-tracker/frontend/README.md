# OctoFit Tracker frontend

React 19 presentation tier for OctoFit Tracker.

## API configuration

For a Codespaces backend, create `.env.local` in this directory and define the
Codespace name:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then uses `https://your-codespace-name-8000.app.github.dev/api/`.
When `VITE_CODESPACE_NAME` is not defined, requests safely fall back to
`http://localhost:8000/api/`.

## Commands

```bash
npm run dev
npm run build
npm run lint
```
