# AgroSmart

Full-stack farming platform. `backend/` is a Flask API, `frontend/` is a Vite + React app.

## Backend setup

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` with real values, then create the database. Either run the SQL schema file directly in pgAdmin, or use Flask-Migrate:

```
createdb agrosmart
flask db init
flask db migrate -m "initial"
flask db upgrade
```

Promote your account to admin after signing up once through the app:

```sql
UPDATE users SET role = 'admin' WHERE phone = 'your-phone-number';
```

Run it:

```
python app.py
```

Backend runs on `http://localhost:5000`. Ollama must be running locally with the model set in `.env` (`OLLAMA_MODEL`) pulled already, e.g. `ollama pull phi3:mini`.

## Frontend setup

```
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173` and talks to the backend using `VITE_API_BASE_URL` from `.env`.

## Testing

Backend has a real test suite covering auth, AI chat, weather, and market (external calls are mocked so tests don't hit real APIs or need Ollama running):

```
cd backend
pip install -r requirements.txt
pytest tests/ -v
```

All 16 tests pass as of this delivery.

## What's included

**Design system**
- Real token system: primary/secondary/accent/neutral color scales, Fraunces + Inter type pairing, spacing/radius/shadow tokens, all in `tailwind.config.js`
- Light/dark mode, persisted to `localStorage`, no flash on load
- `prefers-reduced-motion` respected globally
- Every page now uses the token system consistently, not just the homepage

**Responsive & PWA**
- Mobile-first, no horizontal scroll, 44px minimum tap targets throughout
- `ResponsiveTable` component — real table at desktop widths, card layout on mobile — applied to Market and Weather forecast
- Installable PWA: `manifest.json`, service worker with offline fallback page, favicon
- Below-the-fold images lazy-loaded, hero image uses `srcset`

**Backend**
- JWT auth (`/auth/signup`, `/auth/login`, `/auth/me`), hashed passwords, role-based access (`farmer` / `admin`)
- Crops and tools moved from hardcoded lists into the database with full CRUD (`/crops`, `/tools`), admin-only writes
- Community posts, likes, and comments persist for real (`/community/*`)
- Contact form and newsletter signups persist for real (`/contact`, `/newsletter`)
- Admin routes for contact triage and community moderation (`/admin/*`)
- Shared input validation/sanitization layer used across every POST/PUT
- Cached weather and market endpoints, rate limiting on auth and AI routes
- AI chat accepts a `language` parameter (English/Hindi scaffolded) and saves history

**Frontend**
- Admin panel at `/admin`, gated by `ProtectedRoute` + role check
- Auth session state via `AuthContext`, `Navbar` reflects real login state
- Code-split routes via `React.lazy` — confirmed with a real production build, each page is its own JS chunk
- Global error boundary, skeleton loading states on Market/Weather/Crops/Tools
- Icon-only buttons have `aria-label`s, images have `alt` text

## What's next (not in this pass)

- Password reset flow (needs your email/SMS provider choice — see action items file)
- Full accessibility audit beyond the aria-label/alt-text/contrast basics already applied (full keyboard nav walkthrough, screen reader testing)
- Translation layer / Hindi UI copy (AI prompt already accepts a `language` param, UI copy not yet extracted into a translation layer)
- Sentry/error monitoring hooks (need your DSN)
- Lighthouse tuning pass (structure is in place — code splitting, lazy images, caching — but not yet measured and tuned against a live deploy)

## Before going live

- Run behind gunicorn + nginx with HTTPS, not `python app.py`
- Set `FLASK_ENV=production`, real `SECRET_KEY` and `JWT_SECRET_KEY`
- Verify the market data source (`MARKET_API_URL`) is a legitimate, licensed API
- Point `CORS_ORIGINS` and `VITE_API_BASE_URL` at your real domains
- Move Ollama off your local machine or switch to a hosted LLM API
