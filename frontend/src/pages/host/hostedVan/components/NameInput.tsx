type NameInputProps = {
  defaultValue?: string;
};

export default function NameInput({ defaultValue = "" }: NameInputProps) {
  return (
    <div className="flex flex-col items-start">
      <label htmlFor="name-field" className="mb-2 text-xl font-bold">
        Name:
      </label>
      <input
        id="name-field"
        name="name"
        type="text"
        defaultValue={defaultValue}
        className="rounded-lg border p-3 text-lg transition-colors hover:border-orange-400"
      />
    </div>
  );
}
