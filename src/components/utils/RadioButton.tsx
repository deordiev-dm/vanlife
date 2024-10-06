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
    <label className="group flex cursor-pointer items-center gap-2 rounded-lg p-1 focus-within:outline focus-within:outline-2 focus-within:outline-orange-400">
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />

      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${checked ? "border-orange-400" : "border-gray-400"}`}
      >
        <span
          className={`h-3 w-3 rounded-full transition-colors ${checked && "bg-orange-400"} `}
        ></span>
      </span>
      <span>{label}</span>
    </label>
  );
}
