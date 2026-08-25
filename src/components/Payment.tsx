import {
  closePaymentModal,
  FlutterWaveButton,
} from "flutterwave-react-v3";
import Logo from "../images/logo.png";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../utils/store";

type FlutterwaveResponse = {
  status?: string;
  transaction_id?: string | number;
  tx_ref?: string;
  [key: string]: unknown;
};

export default function Payment() {
  const navigate = useNavigate();

  const grandTotal = useProductStore((state) => state.getGrandTotal());

  const [txRef, setTxRef] = useState(() => crypto.randomUUID());
  const [showTestCards, setShowTestCards] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);

  const toHomepage = () => {
    navigate("/");
  };

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const isValid =
    formData.name.trim() !== "" &&
    isEmailValid &&
    formData.phone.trim() !== "";

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!showTestCards) return;

    modalCloseButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowTestCards(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showTestCards]);

  const handlePaymentSuccess = async (
    response: FlutterwaveResponse
  ) => {
    closePaymentModal();

    // Do not treat a non-successful Flutterwave response as a successful order.
    if (response.status !== "successful") {
      console.error("Flutterwave payment was not successful:", response);
      return;
    }

    setTxRef(crypto.randomUUID());

    navigate("/loading-screen");

    try {
      console.log("Flutterwave Response:", response);

      const delivery = JSON.parse(
        localStorage.getItem("pending-delivery") || "{}"
      );

      const productStore = useProductStore.getState();

      const cart = productStore.cart;
      const deliveryFee = productStore.deliveryFee;
      const subtotal = productStore.getTotalPrice();

      const order = {
        id: crypto.randomUUID(),
        transactionId: response.transaction_id?.toString() || "",
        createdAt: new Date().toISOString(),
        status: "Out for delivery",
        paymentStatus: response.status,
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        },
        delivery: {
          city: delivery.city,
          address: delivery.address,
        },
        items: cart,
        subtotal,
        deliveryFee,
        total: grandTotal,
      };

      productStore.addOrder(order);
      productStore.clearCart();

      localStorage.removeItem("pending-delivery");

      navigate("/payment-receipt", {
        state: {
          paymentData: response,
          amount: grandTotal,
          total: grandTotal,
        },
      });
    } catch (error) {
      console.error("Payment processing error:", error);
    }
  };

  const config = useMemo(
    () => ({
      // Use an environment variable for production.
      public_key:
        import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY ||
        "FLWPUBK_TEST-2527c65af66358ef0ac99317a42a5f51-X",

      tx_ref: txRef,
      amount: grandTotal,
      currency: "USD",
      payment_options: "card",

      customer: {
        email: formData.email.trim(),
        phone_number: formData.phone.trim(),
        name: formData.name.trim(),
      },

      meta: {
        consumer_id: 23,
        consumer_mac: 24,
      },

      customizations: {
        title: formData.name.trim() || "Food Zone",
        description: "Payment",
        logo: 'data:image/png;base64,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',
      },
    }),
    [txRef, grandTotal, formData]
  );

  const fwConfig = {
    ...config,

    text: `Pay $${grandTotal.toFixed(2)}`,

    callback: handlePaymentSuccess,

    onClose: () => {
      setTxRef(crypto.randomUUID());
      console.log("Flutterwave payment modal closed");
    },
  };

  return (
    <div className="min-h-screen bg-neutral-100 px-4 md:px-8 py-6">
      <div className="max-w-2xl mx-auto flex justify-between items-center mb-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">←</span>
          Back
        </button>
      </div>

      <main className="flex justify-center">
        <section
          className="bg-white w-full max-w-2xl rounded-3xl p-6 md:p-10 shadow-xl"
          aria-labelledby="payment-heading"
        >
          {/* HEADER */}
          <header className="text-center mb-8">
            <button
              type="button"
              onClick={toHomepage}
              aria-label="Food Zone homepage"
              className="mx-auto block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              <img
                src={Logo}
                alt="Food Zone"
                className="w-12 h-5 lg:w-25.25 lg:h-9.75 mb-3 mx-auto"
              />
            </button>

            <h1 id="payment-heading" className="sr-only">
              Payment information
            </h1>
          </header>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FULL NAME */}
            <div>
              <label htmlFor="payment-name" className="sr-only">
                Full name
              </label>

              <input
                id="payment-name"
                name="name"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="payment-email" className="sr-only">
                Email address
              </label>

              <input
                id="payment-email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-invalid={
                  formData.email.length > 0 && !isEmailValid
                }
                aria-describedby={
                  formData.email.length > 0 && !isEmailValid
                    ? "email-error"
                    : undefined
                }
                className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />

              {formData.email && !isEmailValid && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-red-400 text-xs mt-1"
                >
                  Enter a valid email address
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label htmlFor="payment-phone" className="sr-only">
                Phone number
              </label>

              <input
                id="payment-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* AMOUNT */}
            <div>
              <label htmlFor="payment-amount" className="sr-only">
                Payment amount
              </label>

              <input
                id="payment-amount"
                type="text"
                value={`$${grandTotal}`}
                className="border p-3 rounded-xl w-full"
                readOnly
                aria-readonly="true"
              />
            </div>

            {/* TEST PAYMENT INFO */}
            <div className="mt-4 md:col-span-2">
              <button
                type="button"
                onClick={() => setShowTestCards(true)}
                aria-haspopup="dialog"
                aria-expanded={showTestCards}
                className="w-full rounded-2xl border border-orange-100 bg-orange-50/70 px-4 py-3 text-left transition hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF8233] text-white font-bold shadow-sm"
                  >
                    i
                  </span>

                  <p className="text-sm md:text-[17px] font-semibold text-black">
                    Flutterwave Test Sandbox
                  </p>
                </div>

                <div className="mt-1 flex items-start flex-col gap-0.5 pl-10">
                  <p className="text-[12px] md:text-[15px] text-gray-500">
                    This is a test payment. Click to view test cards &
                    PIN instructions.
                  </p>

                  <span className="shrink-0 text-[#FF8233] text-sm font-bold">
                    View →
                  </span>
                </div>
              </button>
            </div>

            {/* PAYMENT BUTTON */}
            <div className="mt-6 md:col-span-2">
              <FlutterWaveButton
                {...fwConfig}
                disabled={!isValid}
                className={`w-full py-4 rounded-xl font-semibold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
                  isValid
                    ? "bg-[#FF8233] hover:bg-[#f5a62366]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </section>
      </main>

      {/* TEST CARDS MODAL */}
      {showTestCards && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowTestCards(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="test-payment-heading"
            aria-describedby="test-payment-description"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              ref={modalCloseButtonRef}
              type="button"
              onClick={() => setShowTestCards(false)}
              aria-label="Close test payment information"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-gray-600 transition hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <span aria-hidden="true">✕</span>
            </button>

            {/* Header */}
            <header className="mb-6 pr-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-[#FF8233]">
                <span aria-hidden="true">●</span>
                TEST SANDBOX
              </div>

              <h2
                id="test-payment-heading"
                className="text-2xl font-bold text-black"
              >
                Simulate a successful payment
              </h2>

              <p
                id="test-payment-description"
                className="mt-2 text-sm leading-6 text-gray-500"
              >
                This checkout is running in Flutterwave's test sandbox.
                No real money will be charged. Use one of the test cards
                below to simulate payment and complete the PIN
                authentication.
              </p>
            </header>

            {/* Cards */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* Mastercard */}
              <div className="overflow-hidden rounded-3xl bg-black p-5 text-white shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                      Test Card
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      Mastercard
                    </p>
                  </div>

                  <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-white/10">
                    <span aria-hidden="true" className="text-xs font-bold">
                      MC
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="font-mono text-lg tracking-widest">
                    5531 8866 5214 2950
                  </p>
                </div>

                <div className="mt-6 flex justify-between">
                  <div>
                    <p className="text-[9px] uppercase text-white/40">
                      Expiry
                    </p>
                    <p className="text-sm">09/32</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase text-white/40">
                      CVV
                    </p>
                    <p className="text-sm">564</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center border-t border-white/10">
                  <div>
                    <p className="text-xs text-white/50">PIN</p>
                    <p className="font-mono text-lg font-bold">3310</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase text-white/40">
                      OTP
                    </p>
                    <p className="text-lg font-bold">12345</p>
                  </div>
                </div>
              </div>

              {/* Second Mastercard */}
              <div className="overflow-hidden rounded-3xl bg-[#FF8233] p-5 text-white shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      Test Card
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      Mastercard
                    </p>
                  </div>

                  <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-white/15">
                    <span aria-hidden="true" className="text-xs font-bold">
                      MC
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="font-mono text-[17px] tracking-widest">
                    5438 8980 1456 0229
                  </p>
                </div>

                <div className="mt-6 flex justify-between">
                  <div>
                    <p className="text-[9px] uppercase text-white/60">
                      Expiry
                    </p>
                    <p className="text-sm">10/31</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase text-white/60">
                      CVV
                    </p>
                    <p className="text-sm">564</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center border-t border-white/10">
                  <div>
                    <p className="text-xs text-white/60">PIN</p>
                    <p className="font-mono text-lg font-bold">3310</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase text-white/40">
                      OTP
                    </p>
                    <p className="text-lg font-bold">12345</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="mt-5 rounded-2xl bg-[#f3f4f6] p-4">
              <div className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="text-[#FF8233]"
                >
                  ⓘ
                </span>

                <div>
                  <p className="text-sm font-semibold text-black">
                    Important
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    These cards are provided only for testing the
                    checkout. They do not represent real bank cards and
                    cannot be used to make real purchases. To make it
                    easier for you, copy & paste the card details
                    somewhere on your computer.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTestCards(false)}
              className="mt-5 w-full rounded-xl bg-black py-3.5 font-semibold text-white transition hover:bg-[#FF8233] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}