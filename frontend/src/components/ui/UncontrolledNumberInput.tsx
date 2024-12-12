import { useState } from "react";

type UncontrolledNumberInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    step?: number;
    max?: number;
  };

export default function UncontrolledNumberInput({
  step = 5,
  max = 99999,
  defaultValue = 0,
  ...inputProps
}: UncontrolledNumberInputProps) {
  const [inputValue, setInputValue] = useState<number>(Number(defaultValue));

  function handleInputChange(value: string) {
    const numericValue = Number(value);
    if (!isNaN(numericValue) && numericValue <= max) {
      setInputValue(numericValue);
    }
  }

  function IncDecButton({ type }: { type: "inc" | "dec" }) {
    const isDecrementDisabled = type === "dec" && inputValue <= 0;
    const isIncrementDisabled = type === "inc" && inputValue >= max;

    return (
      <button
        type="button"
        className="aspect-square w-12 rounded-lg bg-orange-500 text-3xl text-white transition-colors hover:bg-orange-600 disabled:bg-gray-300"
        disabled={type === "dec" ? isDecrementDisabled : isIncrementDisabled}
        onClick={
          type === "dec"
            ? () => setInputValue((prev) => Math.max(prev - step, 0))
            : () => setInputValue((prev) => Math.min(prev + step, max))
        }
      >
        {type === "dec" ? "-" : "+"}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <IncDecButton type="dec" />
      <input
        {...inputProps}
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" && inputValue < max)
            setInputValue((prev) => Math.min(prev + step, max));
          if (e.key === "ArrowDown" && inputValue > 0)
            setInputValue((prev) => Math.max(prev - step, 0));
        }}
        className="max-w-28 rounded-lg border p-3 text-center text-lg font-bold transition-colors hover:border-orange-400"
      />
      <IncDecButton type="inc" />
    </div>
  );
}
