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
    price: 0,
    type: "simple",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"error" | "success" | null>(
    null,
  );

  const { currentUser } = useAuth();

  function handleInput(target: HTMLInputElement | HTMLTextAreaElement): void {
    const { name, value } = target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentUser) return;

    if (!formData.image) {
      alert("Please upload an image!");
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

        setIsSubmitting(false);
        setSubmitStatus("error");
        throw new Error("This is a test error");

        await setDoc(doc(db, "vans", vanId), newVan);
        setIsSubmitting(false);
        setSubmitStatus("success");
      },
    );
  }

  console.log(formData);

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Host a new van</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="mb-1 inline-block pl-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Create a name for your van"
              required
              onChange={(e) => handleInput(e.target as HTMLInputElement)}
              value={formData.name}
              className="w-full rounded-lg border p-3 transition-colors hover:border-orange-400"
            />
          </div>
          <div>
            <label htmlFor="description" className="mb-1 inline-block pl-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Tell everyone why your van is going to create a memorable trip"
              required
              onChange={(e) => handleInput(e.target as HTMLTextAreaElement)}
              value={formData.description}
              className="min-h-20 w-full rounded-lg border p-3 transition-colors hover:border-orange-400"
            />
          </div>
          <div>
            <label htmlFor="price" className="mb-1 inline-block pl-1">
              Price per day in $
            </label>
            <NumberInput
              min={0}
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
          <div className="flex flex-col items-start">
            <DragNDrop
              setImage={(files) =>
                setFormData((prevData) => ({
                  ...prevData,
                  image: files ? files[0] : null,
                }))
              }
            ></DragNDrop>
          </div>
          <Button
            as="button"
            colors="orange"
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? "grey" : "",
            }}
          >
            {isSubmitting ? "Submitting the data" : "Send data"}
          </Button>
        </form>
      </div>
      {submitStatus === "success" && (
        <Message status={"success"} onClose={() => setSubmitStatus(null)}>
          The van is now available to rent!
        </Message>
      )}
      {submitStatus === "error" && (
        <Message status={"error"} onClose={() => setSubmitStatus(null)}>
          There was an error while submitting the van. Please try again.
        </Message>
      )}
    </>
  );
}
