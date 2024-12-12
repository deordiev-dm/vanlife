export default function Label({
  children,
  required,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 inline-block text-lg font-semibold"
    >
      {children}
      {required && <span className="text-base text-red-500">*</span>}
    </label>
  );
}
