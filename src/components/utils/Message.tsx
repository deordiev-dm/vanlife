import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

// it should be fixed to the top of the screen
// based on some prop it should either be a banner or alert type
// based on prop it should be an error, warning or success
// pass the text as children

type Props = {
  children?: React.ReactNode;
  variant: "alert" | "banner";
  status: "neutral" | "error" | "success";
  onClose: () => void;
};

export default function Message({ children, onClose, status }: Props) {
  let backgroundColor = "bg-indigo-500";
  if (status === "error") {
    backgroundColor = "bg-red-500";
  } else if (status === "success") {
    backgroundColor = "bg-green-500";
  }

  return (
    <div
      className={`${backgroundColor} fixed left-1/2 top-0 z-50 flex w-10/12 -translate-x-1/2 items-center justify-between gap-x-4 rounded px-6 py-4 text-white opacity-95`}
    >
      <div>
        <h3 className="text-lg font-medium">Message:</h3>
        {children && <p>{children}</p>}
      </div>
      <button onClick={() => onClose()} className="h-6 w-6 flex-shrink-0">
        <IoIosCloseCircle className="h-full w-full" />
      </button>
    </div>
  );
}
