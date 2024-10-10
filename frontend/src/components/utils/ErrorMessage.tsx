import { FaRegFaceSadCry } from "react-icons/fa6";

export default function ErrorMessage() {
  return (
    <div className="m-auto flex w-full items-center justify-center gap-4 self-center rounded-xl border border-red-500 p-5">
      <FaRegFaceSadCry className="h-8 w-8 flex-shrink-0 fill-red-500" />
      <p className="text-lg font-semibold text-red-500">
        We're sorry, something unexpected happened. Please, try again later.
      </p>
    </div>
  );
}
