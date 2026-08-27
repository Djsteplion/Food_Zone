# Food Zone

A full food-ordering flow — browse menu, cart, delivery details, card payment, receipt, and order history — built as a React + TypeScript SPA with a real payment gateway integration (Flutterwave).

> Live demo: _add your Netlify URL here (repo already ships a `public/_redirects` file, so it's clearly deployed on Netlify — link it)_
> Screenshots: _add 3–4: menu, cart, payment, receipt — food/e-commerce UIs are judged on visuals first, code second_

## What this is

A restaurant ordering app covering the full commerce loop, not just a menu list:

- **Menu & cart** — add/remove items, quantity controls, persisted cart (survives a refresh).
- **Auth** — sign in/sign up flow backed by a real HTTP API (cookie-based sessions via `credentials: "include"`), with protected routes for order history.
- **Delivery details** capture before checkout.
- **Real payment integration** — Flutterwave's hosted checkout modal (`flutterwave-react-v3`), not a fake "Pay Now" button that just navigates you to a success page.
- **Order history** — past orders with drill-into-detail, receipts exportable as PDF/image (`jspdf`, `html-to-image`).
- **Mobile-specific UI** — a separate mobile food tray/menu component set, not just responsive CSS on the desktop layout.
- **Cookie consent banner** — the kind of detail most student projects skip entirely.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript, Vite |
| Routing | React Router v7 |
| State | Zustand (with `devtools` + `persist` middleware) |
| Styling | Tailwind CSS v4 |
| Payments | Flutterwave (card checkout, test sandbox mode) |
| Backend | Custom REST API (auth) — see below |
| PDF / image export | jsPDF, html-to-image |

## Architecture notes

**State management is genuinely structured, not just `useState` everywhere.** `utils/store.ts` splits concerns into two Zustand stores: `useAuthStore` (session state, hydrated on load via `/auth/me`) and `useProductStore` (cart, orders, delivery fee, derived totals like `getGrandTotal()`). The product store uses `persist` middleware so the cart survives a page refresh, and `devtools` middleware so state transitions are inspectable in Redux DevTools during development — a nice, low-cost debugging habit worth mentioning if asked about your state management approach.

**Payment flow is defensive, not naive.** `Payment.tsx` explicitly checks `response.status !== "successful"` before creating an order record — it does *not* assume the Flutterwave callback firing means the charge succeeded. It also regenerates the `tx_ref` (a UUID) after both success and modal-close, so a user can't retry with a stale transaction reference.

## Known rough edges (fix these before a recruiter clones it)

- **Order history is entirely local.** `addOrder` writes to the same `persist`-backed Zustand store as the cart (`localStorage`), while user auth (`/auth/me`, `/auth/logout`) goes through a real backend. That means orders placed on one device/browser don't show up anywhere else, and a cleared cache wipes order history. This is the single most important thing to either fix (POST completed orders to your backend) or be ready to explain clearly in an interview — "I mocked persistence for the order feed while building out the payment flow first" is a fine answer; getting caught off guard by the question isn't.
- **`Payment.tsx` calls `navigate("/loading-screen")` after a successful charge, but no `/loading-screen` route exists in `App.tsx`.** It's masked by the fact that the very next lines immediately `navigate("/payment-receipt")`, so in practice you never see it break — but it's dead-route navigation and will show up if you ever add a delay or async step in between. Either add the route or remove the call.
- **`utils/supabaseClient.ts` is set up and imported nowhere except inside a commented-out `logout` implementation.** It reads like a leftover from an earlier auth approach (Supabase → custom backend). Delete the file, or the client-side Supabase keys, if this is genuinely unused.
- A Flutterwave **test** public key is hardcoded as a fallback (`FLWPUBK_TEST-...`) if the env var isn't set. Test keys are safe to expose, but the pattern (secret with a fallback baked into source) is one to break now before it becomes habit — always fail loudly if a required env var is missing rather than silently falling back to a hardcoded value, even a test one.
- Product catalog (4 items, all priced identically at `$20`) is hardcoded in the store rather than fetched from a menu API. Fine for a demo; say so upfront rather than letting a reviewer assume otherwise.

## Getting started

```bash
git clone https://github.com/Djsteplion/Food_Zone.git
cd Food_Zone
npm install
```

Create a `.env` file:

```
VITE_API_URL=<your auth backend URL>
VITE_SUPABASE_URL=<if still using Supabase>
VITE_SUPABASE_ANON_KEY=<if still using Supabase>
VITE_FLUTTERWAVE_PUBLIC_KEY=<your Flutterwave test/live public key>
```

```bash
npm run dev
```

## Project structure

```
src/
  components/
    Header.tsx / MobileMenu.tsx / Menu.tsx     # Browse
    CartPage.tsx / DeliveryPage.tsx            # Checkout flow
    Payment.tsx / PaymentReceipt.tsx           # Flutterwave + receipt
    OrderPage.tsx / OrderDetails.tsx           # Order history
    Authentication.tsx                          # Sign in / sign up
    CookieConsent.tsx
  utils/
    store.ts             # Zustand: auth store + product/cart/order store
    supabaseClient.ts     # (currently unused — see notes above)
```
