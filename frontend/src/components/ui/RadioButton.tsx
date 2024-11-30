import { ChangeEvent } from "react";

type RadioButtonProps = {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioButton({
  label,
  value,
  name,
  checked,
  onChange,
}: RadioButtonProps) {
  return (
    <label
      className={`group flex cursor-pointer items-center gap-x-2 rounded-xl px-3 py-2 transition-colors duration-300 ${
        checked ? "bg-orange-500" : "bg-zinc-200 hover:bg-zinc-300"
      }`}
    >
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-orange-500 transition-colors duration-300 ${checked ? "border-white bg-orange-300" : "border-zinc-400"} `}
      >
        <div
          className={`h-3/4 w-3/4 rounded-full bg-white transition-transform duration-300 ${checked ? "scale-100" : "scale-0"}`}
        ></div>
      </div>
      <span
        className={`font-medium text-white duration-300 ${checked ? "text-white" : "text-zinc-400"}`}
      >
        {label}
      </span>
    </label>
  );
}
