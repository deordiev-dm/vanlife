import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children }: { children: React.ReactNode }) {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);
    }

    return () => {
      if (modalRoot && elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(children, elRef.current);
}

export default Modal;
