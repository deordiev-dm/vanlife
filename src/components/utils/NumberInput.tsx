type NumberInputProps = {
  min: number;
  max: number;
  step?: number;
  id: string;
  price: number;
  setPrice: (newValue: number) => void;
  className?: string;
};

export default function NumberInput({
  id,
  min,
  max,
  step = 5,
  price,
  setPrice,
  className,
}: NumberInputProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      const newValue = parseInt(inputValue);
      if (!isNaN(newValue)) {
        setPrice(Math.min(newValue, max));
      } else {
        setPrice(0);
      }
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <button
          onClick={() => setPrice(price - step)}
          type="button"
          disabled={price <= min}
          className="min-w-12 rounded-lg bg-orange-400 px-4 text-xl font-bold text-white transition-colors hover:bg-orange-500 active:bg-orange-600 disabled:bg-gray-300"
        >
          -
        </button>
        <input
          type="text"
          id={id}
          value={price}
          min={min}
          max={max}
          step={step}
          onChange={handleInputChange}
          className={`max-w-20 rounded-lg border p-3 text-center transition-colors hover:border-orange-400 ${className}`}
        />
        <button
          onClick={() => setPrice(price + step)}
          type="button"
          disabled={price >= max}
          className="min-w-12 rounded-lg bg-orange-400 px-4 text-xl font-bold text-white transition-colors hover:bg-orange-500 active:bg-orange-600 disabled:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
}
