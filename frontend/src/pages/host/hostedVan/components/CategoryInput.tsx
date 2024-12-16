import UncontrolledRadioButton from "@/components/ui/UncontrolledRadioButton";

type CategoryInputProps = {
  currentCategory?: string;
};

const name = "type";
const buttons = ["simple", "luxury", "rugged"];

export default function CategoryInput({ currentCategory }: CategoryInputProps) {
  return (
    <div>
      <label className="mb-2 inline-block text-xl font-bold">Category:</label>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {buttons.map((button) => (
          <UncontrolledRadioButton
            key={button}
            value={button}
            name={name}
            defaultChecked={
              currentCategory?.toLowerCase() === button.toLowerCase()
            }
          />
        ))}
      </div>
    </div>
  );
}
