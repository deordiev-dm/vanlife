import React from "react";

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  handleInput: (target: HTMLInputElement) => void;
};

export default function FormField({
  label,
  handleInput,
  required,
  ...inputProps
}: FormFieldProps) {
  return (
    <div>
      <label
        className="mb-1 inline-block pl-1 text-lg"
        htmlFor={inputProps.name}
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        {...inputProps}
        required={required}
        onChange={(e) => handleInput(e.target)}
        className="w-full rounded-lg border p-3 text-lg transition-colors hover:border-orange-400"
      />
    </div>
  );
}
