import XMarkIcon from "@/components/icons/XMarkIcon";
import { useEffect, useState } from "react";

type ErrorPopupProps = {
  text?: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shouldDisappear?: boolean;
  timerMs?: string;
};

export default function ErrorPopup({
  text,
  setModalOpen,
  shouldDisappear = true,
  timerMs = "5000",
}: ErrorPopupProps) {
  const [isClosing, setClosing] = useState(false);

  useEffect(() => {
    let animationDelay: null | NodeJS.Timeout = null;
    let DOMRemoveDelay: null | NodeJS.Timeout = null;

    if (shouldDisappear) {
      animationDelay = setTimeout(() => {
        setClosing(true);
      }, +timerMs);

      DOMRemoveDelay = setTimeout(() => {
        setModalOpen(false);
      }, +timerMs + 400);
    }

    return () => {
      if (animationDelay) {
        clearTimeout(animationDelay);
      }
      if (DOMRemoveDelay) {
        clearTimeout(DOMRemoveDelay);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`modal ${isClosing ? "closing" : ""} fixed bottom-8 left-1/2 z-[999] -translate-x-1/2 overflow-clip rounded-lg bg-orange-500 px-5 pb-2 pt-2 text-white`}
    >
      <div className="flex items-center gap-x-4">
        <p className="text-lg">
          {text || "Sorry, something unexpected happened"}
        </p>

        <button
          onClick={() => {
            setClosing(true);
            setTimeout(() => {
              setModalOpen(false);
            }, 400);
          }}
        >
          <XMarkIcon className="size-8" />
        </button>
      </div>
      {shouldDisappear && (
        <span
          style={{ animationDuration: `${timerMs}ms` }}
          className="timer absolute bottom-0 left-0 h-1 w-full rounded-lg bg-orange-300"
        ></span>
      )}
    </div>
  );
}
