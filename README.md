# Food Zone

A full food-ordering flow — browse menu, cart, delivery details, card payment, receipt, and order history — built as a React + TypeScript SPA with a real payment gateway integration (Flutterwave).

> Live demo:   https://food-zone-xum.netlify.app/
> Screenshots:
<img src="assets\Screenshot 2026-08-28 230120.png" alt="image showing the food items for sale" width="500">
<img src="assets\Screenshot 2026-08-28 231049.png" alt="image showing the test-cards section of the payment page" width="500">
<img src="assets\Screenshot 2026-08-28 231253.png" alt="image showing the auto-generated custom receipt, after a successful flutterwave payment" width="500">   
<img src="assets\Screenshot 2026-08-28 231516.png" alt="image showing the customer's order details & status" width="500">
<img src="assets\Screenshot 2026-08-28 231413.png" alt="image showing an animated page, indicating that the customer's order is on it's way" width="500">


## What this is

A restaurant ordering app covering the full commerce loop, not just a menu list:

- **Menu & cart** — add/remove items, quantity controls, persisted cart (survives a refresh).
- **Auth** — sign in/sign up flow backed by a real HTTP API (cookie-based sessions via `credentials: "include"`), with protected routes for order history.
- **Delivery details** capture before checkout.
- **Real payment integration** — Flutterwave's hosted checkout modal (`flutterwave-react-v3`), not a fake "Pay Now" button that just navigates you to a success page.
- **Order history** — past orders with drill-into-detail, receipts exportable as PDF/image (`jspdf`, `html-to-image`).
- **Mobile-specific UI** — a separate mobile food tray/menu component set, not just responsive CSS on the desktop layout.
- **Cookie consent banner** — only the necessary ones.

  
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

**State management is genuinely structured, not just `useState` everywhere.** `utils/store.ts` splits concerns into two Zustand stores: `useAuthStore` (session state, hydrated on load via `/auth/me`) and `useProductStore` (cart, orders, delivery fee, derived totals like `getGrandTotal()`). The product store uses `persist` middleware so the cart survives a page refresh, and `devtools` middleware so state transitions are inspectable in Redux DevTools during development.

**Payment flow is defensive, not naive.** `Payment.tsx` explicitly checks `response.status !== "successful"` before creating an order record — it does *not* assume the Flutterwave callback firing means the charge succeeded. It also regenerates the `tx_ref` (a UUID) after both success and modal-close, so a user can't retry with a stale transaction reference.



## Getting started

```bash
git clone https://github.com/Djsteplion/Food_Zone.git
cd Food_Zone
npm install
```

Create a `.env` file:

```
VITE_API_URL=<your auth backend URL>
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
```
