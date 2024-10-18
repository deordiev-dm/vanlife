import { useOutletContext } from "react-router-dom";
import { type Van } from "../../utils/types";
import { MdOutlineModeEdit, MdOutlineEditOff } from "react-icons/md";
import { useEffect, useState } from "react";
import { editVan, queryParamsType } from "../../utils/api";
import Message from "../../components/utils/Message";

type VanDetailFieldProps = {
  label: string;
  value: Partial<Pick<Van, "name" | "description" | "type">>;
  van: Van;
  setSubmitStatus: React.Dispatch<
    React.SetStateAction<"error" | "success" | null>
  >;
};

export default function HostVanDetails() {
  const [submitStatus, setSubmitStatus] = useState<"error" | "success" | null>(
    null,
  );
  const { displayedVan, fetchVans } = useOutletContext<{
    displayedVan: Van;
    fetchVans: (queryParams?: queryParamsType) => Promise<void>;
  }>();

  useEffect(() => {
    fetchVans();
  }, [submitStatus, fetchVans]);

  if (!displayedVan) return <div className="loader"></div>;

  return (
    <>
      {submitStatus === "success" && (
        <Message
          status="success"
          onClose={() => setSubmitStatus(null)}
          title="Success!"
        >
          Van info has been updated!
        </Message>
      )}
      <VanDetailField
        van={displayedVan}
        label="Name"
        value={{ name: displayedVan.name }}
        setSubmitStatus={setSubmitStatus}
      />
      <VanDetailField
        van={displayedVan}
        label="Category"
        value={{ type: displayedVan.type }}
        setSubmitStatus={setSubmitStatus}
      />
      <VanDetailField
        van={displayedVan}
        label="Description"
        value={{ description: displayedVan.description }}
        setSubmitStatus={setSubmitStatus}
      />
    </>
  );
}

function VanDetailField({
  van,
  label,
  value,
  setSubmitStatus,
}: VanDetailFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(Object.values(value)[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInputValue(value);
  }

  async function handleVanEdit(
    van: Van,
    value: string,
    inputValue: string,
  ): Promise<void> {
    setError(null);

    if (!inputValue) {
      setError(new Error("Field cannot be empty"));
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    let fieldToUpdate: Partial<Van> = {};
    switch (value) {
      case "name": {
        fieldToUpdate = { name: inputValue };
        break;
      }
      case "type": {
        if (["simple", "rugged", "luxury"].includes(inputValue)) {
          fieldToUpdate = {
            type: inputValue as "simple" | "rugged" | "luxury",
          };
        } else {
          throw new Error("Invalid type value");
        }
        break;
      }
      case "description": {
        fieldToUpdate = { description: inputValue };
        break;
      }
      default: {
        throw new Error("Invalid field to update");
      }
    }

    try {
      setLoading(true);

      await editVan(van.id, fieldToUpdate);
      setSubmitStatus("success");
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && error.message === "Field cannot be empty" && (
        <Message status="error" onClose={() => setError(null)} title="Error!">
          {error.message}
        </Message>
      )}
      <div>
        <div className="mb-1 flex items-center gap-x-2">
          <span className="text-lg font-semibold">{label}: </span>
          <button
            type="button"
            className="rounded p-1 transition-colors hover:bg-orange-400"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <MdOutlineEditOff className="h-5 w-5" />
            ) : (
              <MdOutlineModeEdit className="h-5 w-5" />
            )}
          </button>
        </div>
        <div>
          {isEditing ? (
            <div className="flex items-center gap-x-[2px]">
              <input
                type="text"
                required
                value={inputValue}
                onChange={handleInputChange}
                className="rounded-s-lg border px-3 py-1 transition-colors hover:border-orange-400"
              />
              <button
                onClick={() =>
                  handleVanEdit(van, Object.keys(value)[0], inputValue)
                }
                className="disabled:bg-grey-300 rounded-e-lg border border-orange-400 bg-orange-400 p-1 px-3 text-white transition-colors hover:bg-orange-500 active:bg-orange-600 disabled:pointer-events-none disabled:border-gray-300"
                disabled={loading || !inputValue}
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          ) : (
            <span>{Object.values(value)[0]}</span>
          )}
        </div>
      </div>
    </>
  );
}
