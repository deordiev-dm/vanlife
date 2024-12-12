import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import DragNDrop from "@/components/ui/DragNDrop";
import WarningNotification from "@/components/ui/WarningNotification";
import SuccessNotification from "@/components/ui/SuccessNotification";
import FormField from "@/components/forms/FormField";
import UncontrolledNumberInput from "@/components/ui/UncontrolledNumberInput";
import UncontrolledRadioButton from "@/components/ui/UncontrolledRadioButton";
import Label from "@/components/forms/Label";
import uploadImage from "@/database/uploadImage";
import { createVan } from "@/features/vans/api/createVan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";

const imgOptions = {
  maxSizeMB: 0.3,
  maxWidthOrHeight: 1080,
};

type FormDataType = {
  name: string;
  price: string;
  description: string;
  type: "simple" | "luxury" | "rugged";
  image: null | File;
};

const RADIO_BUTTONS = [
  { value: "simple" },
  { value: "luxury" },
  { value: "rugged" },
];

export default function AddVan() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createVan,
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
    onError: () => {
      setIsModalOpen(true);
    },
  });

  function handleInput() {
    setError(null);
    setIsModalOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitStatus(null);
    setError(null);
    setIsModalOpen(false);

    if (!currentUser) return;

    if (!image) {
      setError(new Error("Please provide an image"));
      setIsModalOpen(true);
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as FormDataType;

    try {
      setIsSubmitting(true);

      const resizedImg = await imageCompression(image, imgOptions);
      const imageUrl = await uploadImage(resizedImg, image.name);

      mutation.mutate({ hostId: currentUser._id, imageUrl, ...data });

      setSubmitStatus("success");
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err);
        setIsModalOpen(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Host a new van</h1>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          onChange={handleInput}
        >
          <FormField
            label="Van Name"
            handleInput={() => {}}
            placeholder="Create a name for your van"
            required
            name="name"
            id="name"
          />
          <div>
            <Label required htmlFor="description">
              Description
            </Label>
            <textarea
              id="description"
              name="description"
              minLength={20}
              required
              placeholder="Tell everyone why your van is going to create a memorable trip"
              className="input-validate min-h-20 w-full rounded-lg border p-3 transition-colors hover:border-orange-400"
            />
          </div>
          <div>
            <Label required htmlFor="price">
              Price per day in USD
            </Label>
            <UncontrolledNumberInput
              id="price"
              name="price"
              defaultValue={30}
            />
          </div>
          <div>
            <Label htmlFor="radio-buttons" required>
              Choose a type that best describes your van
            </Label>
            <div id="radio-buttons" className="flex gap-x-2">
              {RADIO_BUTTONS.map((btn) => (
                <UncontrolledRadioButton
                  name="type"
                  key={btn.value}
                  label={btn.value}
                  value={btn.value}
                  defaultChecked={btn.value === "simple"}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <Label htmlFor="image-upload" required>
              Upload an image of your van
            </Label>
            <DragNDrop setImage={setImage} />
          </div>
          <Button
            as="button"
            disabled={isSubmitting}
            className="disabled:bg-gray-300"
          >
            {isSubmitting ? "Submitting the data..." : "Post the van"}
          </Button>
        </form>
      </div>

      {error && isModalOpen && (
        <WarningNotification
          message={error.message}
          setIsOpen={setIsModalOpen}
        />
      )}
      {submitStatus === "success" && isModalOpen && (
        <SuccessNotification
          message="Added van successfully!"
          setIsOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
