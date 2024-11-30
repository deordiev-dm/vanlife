type FormFieldProps = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  value: string | number | readonly string[] | undefined;
  handleInput: (target: HTMLInputElement) => void;
  required?: boolean;
};

export default function FormField(props: FormFieldProps) {
  return (
    <div>
      <label className="mb-1 inline-block pl-1 text-lg" htmlFor={props.name}>
        {props.label}
        {props.required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={props.name}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required
        onChange={(e) => props.handleInput(e.target)}
        value={props.value}
        className="w-full rounded-lg border p-3 text-lg transition-colors hover:border-orange-400"
      />
    </div>
  );
}
