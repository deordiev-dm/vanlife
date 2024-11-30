import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "@/style.css";
import XMarkIcon from "../icons/XMarkIcon";

type ErrorPopupProps = {
  error: Error;
  shouldDisappear?: boolean;
  timerMs?: number;
};

const ANIMATION_DURATION_MS = 400;

export default function ErrorPopup({
  error,
  shouldDisappear = true,
  timerMs = 3000,
}: ErrorPopupProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

  const [isClosing, setClosing] = useState(false);

  useEffect(() => {
    const container = document.createElement("div");
    containerRef.current = container;
    document.body.appendChild(container);
    rootRef.current = createRoot(container);

    let animationTimeout: NodeJS.Timeout | null = null;
    let removalTimeout: NodeJS.Timeout | null = null;

    if (shouldDisappear) {
      animationTimeout = setTimeout(() => {
        setClosing(true);
      }, timerMs);

      removalTimeout = setTimeout(() => {
        cleanupPopup();
      }, timerMs + ANIMATION_DURATION_MS);
    }

    return () => {
      if (animationTimeout) clearTimeout(animationTimeout);
      if (removalTimeout) clearTimeout(removalTimeout);

      cleanupPopup();
    };
  }, []);

  useEffect(() => {
    if (rootRef.current) rootRef.current.render(renderContent());
  }, [isClosing]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      cleanupPopup();
    }, ANIMATION_DURATION_MS);
  };

  const cleanupPopup = () => {
    if (rootRef.current && containerRef.current) {
      if (document.body.contains(containerRef.current)) {
        rootRef.current.unmount();
        document.body.removeChild(containerRef.current);
      }
      rootRef.current = null;
      containerRef.current = null;
    }
  };

  const renderContent = () => (
    <div
      className={`modal ${isClosing ? "closing" : ""} fixed bottom-2 left-1/2 min-w-80 -translate-x-1/2 overflow-clip rounded-lg bg-red-600 px-6 py-3 text-white`}
    >
      <div className="flex items-center justify-between gap-x-3">
        <p>{error.message || "An error occurred"}</p>
        <button onClick={handleClose}>
          <XMarkIcon />
        </button>
      </div>
      {shouldDisappear && (
        <span
          style={{
            animationDuration: `${timerMs}ms`,
          }}
          className="timer absolute bottom-0 left-0 h-1 w-full rounded-lg bg-red-200"
        ></span>
      )}
    </div>
  );

  return null;
}
