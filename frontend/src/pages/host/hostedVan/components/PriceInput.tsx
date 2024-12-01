import UncontrolledNumberInput from "@/components/ui/UncontrolledNumberInput";

type PriceInputProps = {
  defaultValue?: number | string;
};

export default function PriceInput({ defaultValue }: PriceInputProps) {
  return (
    <div>
      <label
        className="mb-2 inline-block text-xl font-bold"
        htmlFor="price-input"
      >
        Price:
      </label>
      <UncontrolledNumberInput
        name="price"
        step={5}
        id="price-input"
        defaultValue={defaultValue}
      />
    </div>
  );
}
