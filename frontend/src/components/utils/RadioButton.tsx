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
      className={`group cursor-pointer rounded-lg px-3 py-2 transition-colors ${checked ? "bg-orange-400 text-black" : "bg-gray-300 text-gray-500"}`}
    >
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span>{label}</span>
    </label>
  );
}
