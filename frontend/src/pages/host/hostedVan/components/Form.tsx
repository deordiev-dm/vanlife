import Button from "@/components/ui/Button";
import { updateVan } from "@/features/vans/api/updateVan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CategoryInput from "./CategoryInput";
import DescriptionInput from "./DescriptionInput";
import NameInput from "./NameInput";
import PriceInput from "./PriceInput";
import { Van } from "@/lib/types/types";
import Modal from "@/components/ui/Modal";
import WarningNotification from "@/components/ui/WarningNotification";
import SuccessNotification from "@/components/ui/SuccessNotification";

type FormDataType = {
  name: string;
  price: string;
  description: string;
  type: "simple" | "luxury" | "rugged";
};

function Form({ van }: { van: Van }) {
  const [inputError, setInputError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateVan,
    onSuccess: (data) => {
      setIsModalOpen(true);
      queryClient.invalidateQueries({
        queryKey: ["van", data._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["vans"],
      });
      queryClient.invalidateQueries({
        queryKey: ["hostVans"],
        exact: false,
      });
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setInputError(null);
    setIsModalOpen(false);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as FormDataType;

    // don't make a request if the data hasn't changed
    // needed to use String(...) because price is a number in a database, but a string in data...
    if (
      JSON.stringify(data) ===
      JSON.stringify({
        name: van.name,
        type: van.type,
        description: van.description,
        price: String(van.price),
      })
    ) {
      setInputError(new Error("The data hasn't changed."));
      setIsModalOpen(true);
      return;
    }

    mutation.mutate({ vanId: van._id, fieldsToUpdate: data });
  }
  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setIsModalOpen(false)}
      className="space-y-6"
    >
      <NameInput defaultValue={van.name} />
      <CategoryInput currentCategory={van.type} />
      <DescriptionInput defaultValue={van.description} />
      <PriceInput defaultValue={van.price} />
      <Button
        as="button"
        disabled={mutation.isPending}
        className="transition-colors disabled:bg-slate-300"
      >
        {mutation.isPending ? "Loading..." : "Save changes"}
      </Button>
      {mutation.isSuccess && isModalOpen && (
        <Modal>
          <SuccessNotification
            message="Data has been updated successfully!"
            setIsOpen={setIsModalOpen}
          />
        </Modal>
      )}
      {mutation.isError && (
        <Modal>
          <WarningNotification
            message={mutation.error.message}
            setIsOpen={setIsModalOpen}
          />
        </Modal>
      )}
      {inputError && isModalOpen && (
        <Modal>
          <WarningNotification
            message={inputError.message}
            setIsOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </form>
  );
}

export default Form;
