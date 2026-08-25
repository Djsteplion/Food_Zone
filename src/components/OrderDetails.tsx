import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../utils/store";

const ORDER_STATUSES = [
  "Confirmed",
  "Preparing",
  "Out for delivery",
  "Delivered",
] as const;

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const orders = useProductStore((state) => state.orders);
  const order = orders.find((order) => order.id === id);

  if (!order) {
    return (
      <main className="min-h-screen bg-[#f3f4f6] px-4 py-10">
        <section
          aria-labelledby="order-not-found"
          className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm"
        >
          <h1
            id="order-not-found"
            className="text-2xl font-bold text-black"
          >
            Order not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This order could not be found on this device.
          </p>

          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-[#FF8233] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8233] focus-visible:ring-offset-2"
          >
            Back to Orders
          </button>
        </section>
      </main>
    );
  }

  const currentStatusIndex = ORDER_STATUSES.indexOf(
    order.status as (typeof ORDER_STATUSES)[number]
  );

  const createdAt = new Date(order.createdAt);

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Top Navigation */}
        <nav
          aria-label="Order navigation"
          className="mb-6 flex items-center justify-between"
        >
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8233] focus-visible:ring-offset-2"
          >
            ← Back to Orders
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#FF8233] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8233] focus-visible:ring-offset-2"
          >
            Home
          </button>
        </nav>

        {/* Order Hero */}
        <section
          aria-labelledby="order-title"
          className="rounded-3xl bg-black p-6 text-white shadow-lg md:p-8"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Order
              </p>

              <h1
                id="order-title"
                className="mt-1 text-2xl font-bold md:text-3xl"
              >
                #{order.id.slice(0, 8).toUpperCase()}
              </h1>

              <p className="mt-2 text-sm text-white/60">
                Placed on{" "}
                <time dateTime={createdAt.toISOString()}>
                  {createdAt.toLocaleDateString()} at{" "}
                  {createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </p>
            </div>

            <div
              className="flex items-center gap-2 self-start rounded-full bg-[#FF8233] px-4 py-2 md:self-center"
              aria-label={`Order status: ${order.status}`}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-white"
              />
              <span className="text-sm font-bold">{order.status}</span>
            </div>
          </div>
        </section>

        {/* Order Progress */}
        <section
          aria-labelledby="order-status-heading"
          className="mt-5 rounded-3xl bg-white p-6 shadow-sm md:p-8"
        >
          <h2
            id="order-status-heading"
            className="text-lg font-bold text-black"
          >
            Order Status
          </h2>

          <ol
            aria-label="Order progress"
            className="mt-6 grid grid-cols-4 gap-2"
          >
            {ORDER_STATUSES.map((status, index) => {
              const active =
                currentStatusIndex >= 0 && index <= currentStatusIndex;

              return (
                <li key={status} className="text-center">
                  <div
                    aria-current={
                      status === order.status ? "step" : undefined
                    }
                    className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                      active
                        ? "bg-[#FF8233] text-white"
                        : "bg-[#f3f4f6] text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <p
                    className={`mt-2 text-[10px] md:text-xs ${
                      active ? "font-bold text-black" : "text-gray-400"
                    }`}
                  >
                    {status}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Main Grid */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {/* Items */}
          <section
            aria-labelledby="items-heading"
            className="rounded-3xl bg-white p-6 shadow-sm md:col-span-2 md:p-8"
          >
            <div className="flex items-center justify-between">
              <h2 id="items-heading" className="text-lg font-bold text-black">
                Items Ordered
              </h2>

              <span className="text-xs text-gray-400">
                {order.items.length} item
                {order.items.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="mt-6 divide-y divide-gray-100">
              {order.items.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-20 rounded-2xl bg-[#f3f4f6] object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-black">{item.title}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>

                    <p className="mt-2 text-xs font-medium text-gray-400">
                      ${item.price.toFixed(2)} × {item.count}
                    </p>
                  </div>

                  <p className="font-bold text-black">
                    ${(item.price * item.count).toFixed(2)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Customer Information */}
          <section
            aria-labelledby="delivery-heading"
            className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
          >
            <h2
              id="delivery-heading"
              className="text-lg font-bold text-black"
            >
              Delivery Details
            </h2>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Customer
                </dt>
                <dd className="mt-1 font-semibold text-black">
                  {order.customer.name}
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Email
                </dt>
                <dd className="mt-1 break-all text-sm text-gray-700">
                  {order.customer.email}
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-700">
                  {order.customer.phone}
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Delivery Address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">
                  {order.delivery.address}
                  <br />
                  {order.delivery.city}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Payment + Summary */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Payment */}
          <section
            aria-labelledby="payment-heading"
            className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
          >
            <h2
              id="payment-heading"
              className="text-lg font-bold text-black"
            >
              Payment Information
            </h2>

            <dl className="mt-5 space-y-4">
              <div className="flex justify-between gap-4">
                <dt className="text-sm text-gray-500">Payment Status</dt>
                <dd className="font-semibold text-green-600">
                  {order.paymentStatus}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Transaction ID</dt>
                <dd className="mt-1 break-all font-mono text-xs font-semibold text-black">
                  {order.transactionId}
                </dd>
              </div>
            </dl>
          </section>

          {/* Summary */}
          <section
            aria-labelledby="summary-heading"
            className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-bold text-black"
            >
              Order Summary
            </h2>

            <dl className="mt-5 space-y-3">
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Subtotal</dt>
                <dd className="font-medium text-black">
                  ${order.subtotal.toFixed(2)}
                </dd>
              </div>

              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Delivery fee</dt>
                <dd className="font-medium text-black">
                  ${order.deliveryFee.toFixed(2)}
                </dd>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <dt className="font-bold text-black">Total</dt>
                  <dd className="text-2xl font-bold text-[#FF8233]">
                    ${order.total.toFixed(2)}
                  </dd>
                </div>
              </div>
            </dl>
          </section>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-full bg-[#FF8233] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8233] focus-visible:ring-offset-2"
          >
            Continue Shopping
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black shadow-sm transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8233] focus-visible:ring-offset-2"
          >
            Print Order
          </button>
        </div>
      </div>
    </main>
  );
}