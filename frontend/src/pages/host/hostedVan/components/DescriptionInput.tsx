type DescriptionInputProps = {
  defaultValue?: string;
};

export default function DescriptionInput({
  defaultValue,
}: DescriptionInputProps) {
  return (
    <div className="flex flex-col items-start">
      <label
        htmlFor="description-textarea"
        className="mb-2 inline-block text-xl font-bold"
      >
        Description:
      </label>
      <textarea
        id="name-field"
        name="description"
        className="min-h-40 w-full rounded-lg border p-3 text-lg transition-colors hover:border-orange-400"
        defaultValue={defaultValue}
      />
    </div>
  );
}
