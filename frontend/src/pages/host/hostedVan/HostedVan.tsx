import { Link, useParams } from "react-router-dom";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ErrorPopup from "@/components/ui/ErrorPopup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getVanById from "@/features/vans/api/getVanById";
import { updateVan } from "@/features/vans/api/updateVan";
import NameInput from "./components/NameInput";
import CategoryInput from "./components/CategoryInput";
import DescriptionInput from "./components/DescriptionInput";
import Button from "@/components/ui/Button";
import SuccessPopup from "@/components/ui/SuccessPopup";
import HostedVanCard from "./components/HostedVanCard";
import PriceInput from "./components/PriceInput";
import { useState } from "react";

export default function HostedVan() {
  const params = useParams();
  const [inputError, setInputError] = useState<Error | null>(null);

  // take van id from the address bar
  const vanId = params.id ?? "";

  const {
    data: van,
    isPending,
    error,
  } = useQuery({
    queryKey: ["van", vanId],
    queryFn: () => getVanById(vanId),
    staleTime: 1000 * 60 * 30, // 30 min
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateVan,
    onSuccess: (data) => {
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

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      price: string;
      description: string;
      type: "simple" | "luxury" | "rugged";
    };

    if (van === undefined) {
      return;
    }

    // don't make a request if the data hasn't changed
    // needed to use String(...) because price is a number in a database, but a string in data
    // this is ulgy, I know
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
      return;
    }

    if (!data.name) {
      setInputError(new Error("Van name cannot be empty. Please try again."));
      return;
    }
    if (
      data.type !== "simple" &&
      data.type !== "luxury" &&
      data.type !== "rugged"
    ) {
      setInputError(new Error("Incorrect van category. Please try again."));
      return;
    }
    if (Number(data.price) < 0) {
      setInputError(new Error("Incorrect van category. Please try again."));
      return;
    }
    if (data.description.length < 20) {
      setInputError(new Error("Description is too short. Please try again."));
      return;
    }

    mutation.mutate({ vanId: van._id, fieldsToUpdate: data });
  }

  if (isPending) {
    return <span className="loader"></span>;
  }

  if (van === undefined) {
    return;
  }

  return (
    <div className="space-y-8">
      <Link to=".." relative="path" className="group flex items-center gap-x-3">
        <ArrowLeftIcon className="h-5 w-5 transition group-hover:-translate-x-2" />
        <span className="nav-link">Back to all vans</span>
      </Link>
      <HostedVanCard van={van} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <NameInput defaultValue={van.name} />
        <CategoryInput currentCategory={van.type} />
        <DescriptionInput defaultValue={van.description} />
        <PriceInput defaultValue={van.price} />
        <Button as="button" disabled={mutation.isPending}>
          Save changes
        </Button>
        {mutation.isError && <ErrorPopup error={mutation.error} />}
        {mutation.isSuccess && (
          <SuccessPopup message={"Saved changes successfully!"} />
        )}
      </form>
      {error && <ErrorPopup error={error} key={Date.now()} />}
      {inputError && <ErrorPopup error={inputError} key={Date.now()} />}
    </div>
  );
}
