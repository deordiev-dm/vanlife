type UncontrolledRadioButtonProps = {
  label?: string;
  value: string;
  name: string;
  defaultChecked?: boolean;
};

export default function UncontrolledRadioButton({
  label,
  value,
  name,
  defaultChecked,
}: UncontrolledRadioButtonProps) {
  return (
    <label className="flex cursor-pointer items-center gap-x-2 rounded-xl bg-slate-200 px-3 py-2 transition-colors duration-300 hover:bg-slate-300 has-[:checked]:bg-orange-500">
      <input
        type="radio"
        value={value.toLowerCase()}
        name={name}
        className="peer sr-only"
        defaultChecked={defaultChecked}
      />
      <div className="relative h-6 w-6 rounded-full border-2 border-slate-500 transition-colors duration-300 after:absolute after:left-1/2 after:top-1/2 after:h-4/6 after:w-4/6 after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:rounded-full after:bg-white after:transition-all after:duration-300 peer-checked:border-white peer-checked:after:scale-100"></div>
      <span className="font-medium capitalize text-slate-500 duration-300 peer-checked:text-white">
        {label || value}
      </span>
    </label>
  );
}
