import React from "react";
import Label from "./Label";

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
      <Label required={required} htmlFor={inputProps.name || ""}>
        {label}
      </Label>
      <input
        {...inputProps}
        required={required}
        onChange={(e) => handleInput(e.target)}
        className="w-full rounded-lg border p-3 text-lg transition-colors hover:border-orange-400"
      />
    </div>
  );
}
