import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/database/firebase";
import { createVan } from "@/features/vans/api/createVan";
import { useAuth } from "@/hooks/useAuth";

import Button from "@/components/ui/Button";
import NumberInput from "@/components/ui/NumberInput";
import RadioButton from "@/components/ui/RadioButton";
import DragNDrop from "@/components/ui/DragNDrop";
import WarningNotification from "@/components/ui/WarningNotification";
import SuccessNotification from "@/components/ui/SuccessNotification";

type formDataType = {
  name: string;
  description: string;
  price: number;
  type: "simple" | "rugged" | "luxury";
  image: null | File;
};

export default function AddVan() {
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    description: "",
    price: 20,
    type: "simple",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"error" | "success" | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentUser } = useAuth();

  function handleInput(target: HTMLInputElement | HTMLTextAreaElement): void {
    setError(null);
    setIsModalOpen(false);

    const { name, value } = target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitStatus(null);
    setError(null);
    setIsModalOpen(false);

    if (!currentUser) return;

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.type ||
      !formData.image
    ) {
      setError(new Error("Please, fill in all the required fields."));
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const storageRef = ref(storage, `vans/${formData.image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, formData.image);

    uploadTask.on(
      "state_changed", // event type
      null, // progress can be tracked here
      (error) => {
        console.error("Image upload failed:", error);
        // display an error
        setIsSubmitting(false);
        setError(new Error("Image upload failed. Please, try again."));
        setIsModalOpen(true);
      },
      async () => {
        // on success
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const { name, description, price, type } = formData;

        const newVan = {
          name,
          description,
          price,
          type,
          imageUrl: downloadURL,
          hostId: currentUser._id,
        };

        try {
          await createVan(newVan);
          setSubmitStatus("success");
          setIsModalOpen(true);
          setFormData({
            name: "",
            description: "",
            price: 20,
            type: "simple",
            image: null,
          });
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            setError(error);
            setIsModalOpen(true);
          }
        } finally {
          setIsSubmitting(false);
        }
      },
    );
  }

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Host a new van</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="mb-1 inline-block pl-1 text-lg font-semibold"
            >
              Van Name<span className="text-base text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Create a name for your van"
              onChange={(e) => handleInput(e.target as HTMLInputElement)}
              value={formData.name}
              className={`input-validate w-full rounded-lg border p-3 transition-colors hover:border-orange-400`}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="mb-1 inline-block pl-1 text-lg font-semibold"
            >
              Description<span className="text-base text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Tell everyone why your van is going to create a memorable trip"
              onChange={(e) => handleInput(e.target as HTMLTextAreaElement)}
              value={formData.description}
              className={`input-validate min-h-20 w-full rounded-lg border p-3 transition-colors hover:border-orange-400`}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="inline-block pl-1 text-lg font-semibold"
            >
              Price per day in USD
              <span className="text-base text-red-500">*</span>
            </label>
            <p className="mb-2 pl-1 text-sm text-gray-400">
              The minumum price is 20USD
            </p>
            <NumberInput
              min={20}
              max={999}
              id="price"
              price={formData.price}
              setPrice={(newValue: number) =>
                setFormData((prevData) => ({
                  ...prevData,
                  price: newValue,
                }))
              }
            />
          </div>
          <div>
            <h3 className="mb-1 inline-block pl-1 text-lg font-semibold">
              Choose a type that best describes your van
              <span className="text-base text-red-500">*</span>
            </h3>
            <div className="flex gap-x-2">
              <RadioButton
                label="Simple"
                value="simple"
                name="type"
                checked={formData.type === "simple"}
                onChange={(e) => handleInput(e.target as HTMLInputElement)}
              />
              <RadioButton
                label="Luxury"
                value="luxury"
                name="type"
                checked={formData.type === "luxury"}
                onChange={(e) => handleInput(e.target as HTMLInputElement)}
              />
              <RadioButton
                label="Rugged"
                value="rugged"
                name="type"
                checked={formData.type === "rugged"}
                onChange={(e) => handleInput(e.target as HTMLInputElement)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label className="inline-block pl-1 text-lg font-semibold">
              Upload an image of your van
              <span className="text-base text-red-500">*</span>
            </label>
            <DragNDrop
              setImage={(files) =>
                setFormData((prevData) => ({
                  ...prevData,
                  image: files ? files[0] : null,
                }))
              }
              image={formData.image}
            />
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
