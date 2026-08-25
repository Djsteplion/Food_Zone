import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      const timer = setTimeout(() => {
        setMounted(true);

        // Small delay allows the browser to render the initial state
        // before transitioning to the visible state.
        requestAnimationFrame(() => {
          setVisible(true);
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const continueToSite = () => {
    localStorage.setItem("cookie-consent", "accepted");

    // Start exit animation
    setVisible(false);

    // Remove from DOM after animation finishes
    setTimeout(() => {
      setMounted(false);
    }, 500);
  };

  if (!mounted) return null;

  return (
    <div
      className={`
        fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6
        z-[9999] md:w-[440px]
        transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-[120%] opacity-0"
        }
      `}
    >
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-2xl p-5">

        <h3 className="text-lg font-semibold text-black">
          🍪 Essential cookies
        </h3>

        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
          By continuing to use this website, you agree to our use of
          essential cookies. These cookies are necessary to keep you
          securely signed in and provide core features of the site.
        </p>

        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
          We do not use these cookies for advertising, marketing,
          tracking, or sharing your information with third parties.
        </p>

        <button
          onClick={continueToSite}
          className="
            w-full mt-4 bg-[#FF8233] text-white rounded-xl py-3
            text-sm font-semibold
            hover:opacity-90
            transition-all duration-200
            active:scale-[0.98]
          "
        >
          Continue to site
        </button>

      </div>
    </div>
  );
};

export default CookieConsent;