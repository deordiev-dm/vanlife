import { useState } from "react";
import Button from "../../components/utils/Button";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../utils/api";
import { doc, setDoc } from "firebase/firestore/lite";
import { Van } from "../../utils/types";
import { useAuth } from "../../hooks/useAuth";
import { nanoid } from "nanoid";
import Message from "../../components/utils/Message";
import NumberInput from "../../components/utils/NumberInput";
import RadioButton from "../../components/utils/RadioButton";
import DragNDrop from "../../components/utils/DragNDrop";

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
  const [inputError, setInputError] = useState(false);

  const { currentUser } = useAuth();

  function handleInput(target: HTMLInputElement | HTMLTextAreaElement): void {
    setInputError(false);
    const { name, value } = target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setInputError(false);
    setSubmitStatus(null);

    if (!currentUser) return;

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.type ||
      !formData.image
    ) {
      setInputError(true);
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
        setSubmitStatus("error");
      },
      async () => {
        // on success
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const { name, description, price, type } = formData;
        const vanId = nanoid();

        const newVan: Van = {
          name,
          description,
          price,
          type,
          imageUrl: downloadURL,
          hostId: currentUser.uid,
          id: vanId,
        };

        await setDoc(doc(db, "vans", vanId), newVan);
        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({
          name: "",
          description: "",
          price: 20,
          type: "simple",
          image: null,
        });
      },
    );
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Host a new van</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className={`input-validate w-full rounded-lg border p-3 transition-colors hover:border-orange-400 ${inputError && !formData.name ? "border-red-500" : ""}`}
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
              className={`input-validate min-h-20 w-full rounded-lg border p-3 transition-colors hover:border-orange-400 ${inputError && !formData.description ? "border-red-500" : ""}`}
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
              className={`${inputError && formData.price < 20 && "border-red-500"}`}
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
              inputError={inputError}
            />
          </div>
          <Button
            as="button"
            colors="orange"
            disabled={isSubmitting}
            className="disabled:bg-gray-300"
          >
            {isSubmitting ? "Submitting the data..." : "Post the van"}
          </Button>
        </form>
      </div>
      {inputError && (
        <Message
          status={"error"}
          onClose={() => setInputError(false)}
          title="Error: The form has not been fully completed!"
        >
          Please fill out all the required fields
        </Message>
      )}
      {submitStatus === "success" && (
        <Message
          status={"success"}
          onClose={() => setSubmitStatus(null)}
          title="Form data has been submitted successfully!"
        >
          The van is now available to rent!
        </Message>
      )}
      {submitStatus === "error" && (
        <Message
          status={"error"}
          onClose={() => setSubmitStatus(null)}
          title="Internal Error!"
        >
          There was an error while submitting the van. Please try again.
        </Message>
      )}
    </>
  );
}
