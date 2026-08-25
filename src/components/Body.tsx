import Fz from "./Fz";
import Menu from "./Menu";
import CookieConsent from "./CookieConsent";
import HomeLoader from "./HomeLoader";

import { useEffect, useState } from "react";

const Body = () => {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      const timer = setTimeout(() => {
        setShowCookie(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <HomeLoader>
      <main
        id="main-content"
        className="w-full flex flex-row items-center justify-between pl-12.5"
      >
        <Fz />
        <Menu />
      </main>

      {showCookie && <CookieConsent />}
    </HomeLoader>
  );
};

export default Body;