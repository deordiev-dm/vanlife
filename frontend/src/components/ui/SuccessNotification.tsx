import ExclamationTriangleIcon from "../icons/ExclamationTriangleIcon";
import XMarkIcon from "../icons/XMarkIcon";

function SuccessNotification({
  message,
  setIsOpen,
}: {
  message: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed right-1/2 top-20 z-[999] w-11/12 max-w-[1080px] translate-x-1/2 rounded-lg bg-green-600 px-6 py-4 text-white shadow-lg md:right-4 md:w-3/4 md:translate-x-0 xl:w-[35%]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <ExclamationTriangleIcon className="h-8 w-8 animate-pulse text-white" />
          <h3 className="text-xl font-semibold md:text-2xl">Yay!</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close warning"
          className="rounded-md p-1 transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <p className="mt-2 text-sm leading-relaxed md:text-base">{message}</p>
    </div>
  );
}

export default SuccessNotification;
