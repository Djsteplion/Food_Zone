import { useNavigate } from "react-router-dom";
import { useProductStore } from "../utils/store";

export default function Orders() {
  const navigate = useNavigate();

  const orders = useProductStore((state) => state.orders);

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              My Orders
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              View and track your previous orders
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#FF8233]"
          >
            Home
          </button>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f4f6] text-2xl">
              🛍️
            </div>

            <h2 className="text-xl font-bold text-black">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              You haven't placed any orders yet. Your completed orders will
              appear here.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-full bg-[#FF8233] px-6 py-3 text-sm font-bold text-white transition hover:bg-black"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm"
              >

                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between md:px-7">

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Order ID
                    </p>

                    <p className="mt-1 font-mono text-sm font-semibold text-black">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF8233]" />

                    <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-[#FF8233]">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="p-5 md:px-7">

                  <div className="space-y-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="h-16 w-16 rounded-2xl bg-[#f3f4f6] object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-bold text-black">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            Qty: {item.count}
                          </p>
                        </div>

                        <p className="text-sm font-bold text-black">
                          ${(item.price * item.count).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {order.items.length > 3 && (
                    <p className="mt-4 text-xs font-medium text-gray-400">
                      + {order.items.length - 3} more item
                      {order.items.length - 3 > 1 ? "s" : ""}
                    </p>
                  )}

                </div>

                {/* Footer */}
                <div className="flex flex-col gap-4 border-t border-gray-100 bg-gray-50/70 p-5 md:flex-row md:items-center md:justify-between md:px-7">

                  <div>
                    <p className="text-xs text-gray-500">
                      Total amount
                    </p>

                    <p className="mt-1 text-xl font-bold text-black">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-[#FF8233]"
                  >
                    View Order →
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}