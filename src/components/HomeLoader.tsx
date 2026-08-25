import { useEffect, useState, type ReactNode } from "react";

interface HomeLoaderProps {
  children: ReactNode;
}

const HomeLoader = ({ children }: HomeLoaderProps) => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const images = Array.from(document.images);

    const loadImage = (img: HTMLImageElement) => {
      if (img.complete) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      });
    };

    Promise.all(images.map(loadImage)).then(() => {
      setTimeout(() => {
        setFadeOut(true);

        setTimeout(() => {
          setLoading(false);
        }, 700);
      }, 500);
    });
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-all duration-700 ${
            fadeOut
              ? "opacity-0 scale-105"
              : "opacity-100 scale-100"
          }`}
        >
          {/* Logo */}
          <div className="food-zone-logo mb-7">
            <div className="logo-ring">
              <span>XUM</span>
            </div>
          </div>

          {/* Brand name */}
          <h1 className="food-zone-title">
            Food <span>Zone</span>
          </h1>

          <p className="food-zone-subtitle">
            Deliciousness is loading...
          </p>

          {/* Loader */}
          <div className="mt-8">
            <div className="loader" />
          </div>

          {/* Dots */}
          <div className="loading-dots mt-5">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {children}
    </>
  );
};

export default HomeLoader;