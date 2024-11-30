import { useEffect, useState } from "react";
import ErrorPopup from "@/components/ui/ErrorPopup";
import { editVan } from "@/features/vans/api/editVan";
import { useVans } from "@/hooks/useVans";
import SuccessPopup from "@/components/ui/SuccessPopup";
import RadioButton from "@/components/ui/RadioButton";
import { Van } from "@/lib/types/types";

export default function HostedVanDetails({ van }: { van: Van }) {
  const [initialVan, setInitialVan] = useState(van);
  const [updatedVan, setUpdatedVan] = useState(van);
  const [hasVanChanged, setHasVanChanged] = useState(false);
  const [status, setStatus] = useState<"success" | "loading" | "idle">("idle");
  const [error, setError] = useState<Error | null>(null);

  const { fetchVans } = useVans();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // validate updated data
    if (JSON.stringify(initialVan) === JSON.stringify(updatedVan)) {
      setError(new Error("The data is the same."));
      return;
    }
    if (!updatedVan.name) {
      setError(new Error("Please provide a name for a van."));
      return;
    }
    if (updatedVan.description.length < 50) {
      setError(new Error("Description is too short"));
      return;
    }

    async function updateVan() {
      try {
        setStatus("loading");

        const result = await editVan(initialVan._id, updatedVan);

        setStatus("success");
        setInitialVan(result);

        // refetch vans to display new data
        await fetchVans();
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }

        setStatus("idle");
      }
    }

    // if ok - initiate HTTP request
    updateVan();
  }

  // check whether or not the van object has changed
  useEffect(() => {
    setHasVanChanged(JSON.stringify(initialVan) !== JSON.stringify(updatedVan));
    setError(null);
  }, [initialVan, updatedVan]);

  if (!van) return;

  return (
    <div>
      {error && <ErrorPopup error={error} key={Date.now()} />}
      {status === "success" && (
        <SuccessPopup message="Changes have been saved successfully!" />
      )}

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-10">
        <div className="space-y-3">
          <NameInputField
            value={updatedVan.name}
            onChange={(newValue) =>
              setUpdatedVan((prevState) => ({
                ...prevState,
                name: newValue,
              }))
            }
          />
          <TypeInputField
            value={updatedVan.type}
            onChange={(newValue) => {
              setUpdatedVan((prevState) => ({
                ...prevState,
                type: newValue as "simple" | "luxury" | "rugged",
              }));
            }}
          />
          <DescriptionInputField
            value={updatedVan.description}
            onChange={(newValue) => {
              setUpdatedVan((prevState) => ({
                ...prevState,
                description: newValue,
              }));
            }}
          />
        </div>

        <button
          className="rounded-xl bg-orange-500 px-5 py-2 text-lg font-medium text-white transition-colors hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-500"
          disabled={status === "loading" || !hasVanChanged}
        >
          {status === "loading" ? "Loading..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

type NameInputFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

function NameInputField({ onChange, value }: NameInputFieldProps) {
  return (
    <div className="flex flex-col items-start">
      <label htmlFor="name-field" className="mb-1 pl-1 text-lg">
        Name:
      </label>
      <input
        id="name-field"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type="text"
        value={value || ""}
        className="rounded-lg border p-3 text-lg transition-colors hover:border-orange-400"
      />
    </div>
  );
}

function TypeInputField({ onChange, value }: NameInputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-lg">Category:</label>
      <div className="flex flex-wrap gap-x-4">
        <RadioButton
          label="Simple"
          name="type"
          value={value}
          onChange={() => onChange("simple")}
          checked={value === "simple"}
        />
        <RadioButton
          label="Luxury"
          name="type"
          value={value}
          onChange={() => onChange("luxury")}
          checked={value === "luxury"}
        />
        <RadioButton
          label="Rugged"
          name="type"
          value={value}
          onChange={() => onChange("rugged")}
          checked={value === "rugged"}
        />
      </div>
    </div>
  );
}

function DescriptionInputField({ value, onChange }: NameInputFieldProps) {
  return (
    <div className="flex flex-col items-start">
      <label htmlFor="description-textarea" className="text lg mb-1 pl-1">
        Description:
      </label>
      <textarea
        id="name-field"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value || ""}
        className="min-h-40 w-full rounded-lg border p-3 text-lg transition-colors hover:border-orange-400"
      />
    </div>
  );
}
