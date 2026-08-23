import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../utils/store";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const orders = useProductStore((state) => state.orders);

  const order = orders.find((order) => order.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-black">
            Order not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This order could not be found on this device.
          </p>

          <button
            onClick={() => navigate("/orders")}
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-[#FF8233]"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Top Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/orders")}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-100"
          >
            ← Back to Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#FF8233]"
          >
            Home
          </button>
        </div>

        {/* Order Hero */}
        <div className="rounded-3xl bg-black p-6 text-white shadow-lg md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Order
              </p>

              <h1 className="mt-1 text-2xl font-bold md:text-3xl">
                #{order.id.slice(0, 8).toUpperCase()}
              </h1>

              <p className="mt-2 text-sm text-white/60">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full bg-[#FF8233] px-4 py-2 md:self-center">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="text-sm font-bold">
                {order.status}
              </span>
            </div>

          </div>
        </div>

        {/* Order Progress */}
        <div className="mt-5 rounded-3xl bg-white p-6 shadow-sm md:p-8">

          <h2 className="text-lg font-bold text-black">
            Order Status
          </h2>

          <div className="mt-6 grid grid-cols-4 gap-2">

            {[
              "Confirmed",
              "Preparing",
              "Out for delivery",
              "Delivered",
            ].map((status, index) => {
              const statuses = [
                "Confirmed",
                "Preparing",
                "Out for delivery",
                "Delivered",
              ];

              const currentIndex = statuses.indexOf(order.status);
              const active = index <= currentIndex;

              return (
                <div key={status} className="text-center">

                  <div
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
                      active
                        ? "font-bold text-black"
                        : "text-gray-400"
                    }`}
                  >
                    {status}
                  </p>

                </div>
              );
            })}

          </div>
        </div>

        {/* Main Grid */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">

          {/* Items */}
          <div className="md:col-span-2 rounded-3xl bg-white p-6 shadow-sm md:p-8">

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">
                Items Ordered
              </h2>

              <span className="text-xs text-gray-400">
                {order.items.length} item
                {order.items.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="mt-6 divide-y divide-gray-100">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-20 w-20 rounded-2xl bg-[#f3f4f6] object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-black">
                      {item.title}
                    </h3>

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
                </div>
              ))}

            </div>
          </div>

          {/* Customer Information */}
          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-lg font-bold text-black">
              Delivery Details
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Customer
                </p>

                <p className="mt-1 font-semibold text-black">
                  {order.customer.name}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-gray-700">
                  {order.customer.email}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Phone
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {order.customer.phone}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Delivery Address
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-700">
                  {order.delivery.address}
                  <br />
                  {order.delivery.city}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Payment + Summary */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {/* Payment */}
          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-lg font-bold text-black">
              Payment Information
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Payment Status
                </span>

                <span className="font-semibold text-green-600">
                  {order.paymentStatus}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Transaction ID
                </p>

                <p className="mt-1 break-all font-mono text-xs font-semibold text-black">
                  {order.transactionId}
                </p>
              </div>

            </div>
          </div>

          {/* Summary */}
          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-lg font-bold text-black">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium text-black">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Delivery fee
                </span>

                <span className="font-medium text-black">
                  ${order.deliveryFee.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-black">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#FF8233]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-[#FF8233] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-black"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => window.print()}
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black shadow-sm transition hover:bg-gray-100"
          >
            Print Order
          </button>

        </div>

      </div>
    </div>
  );
}