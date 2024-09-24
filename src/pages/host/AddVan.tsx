import { useState } from "react";
import Button from "../../components/utils/Button";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../utils/api";
import { doc, setDoc } from "firebase/firestore/lite";
import { Van } from "../../utils/types";
import { useAuth } from "../../hooks/useAuth";
import { nanoid } from "nanoid";

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
    price: 30,
    type: "simple",
    image: null,
  });

  const { currentUser } = useAuth();

  function handleInput(target: HTMLInputElement | HTMLTextAreaElement): void {
    const { name, value } = target;
    const files = target instanceof HTMLInputElement ? target.files : null;

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files ? files[0] : null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentUser) return;

    if (!formData.image) {
      alert("Please upload an image!");
      return;
    }

    const storageRef = ref(storage, `vans/${formData.image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, formData.image);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Image upload failed:", error);
      },
      async () => {
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
      },
    );
  }

  return (
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
          <input
            min={30}
            id="price"
            name="price"
            type="number"
            required
            onChange={(e) => handleInput(e.target as HTMLInputElement)}
            value={formData.price}
            className="w-full rounded-lg border p-3 transition-colors hover:border-orange-400"
          />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <label htmlFor="type-simple">Simple</label>
            <input
              type="radio"
              id="type-simple"
              name="type"
              value="simple"
              checked={formData.type === "simple"}
              onChange={(e) => handleInput(e.target as HTMLInputElement)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <label htmlFor="type-luxury">Luxury</label>
            <input
              type="radio"
              name="type"
              value="luxury"
              id="type-luxury"
              checked={formData.type === "luxury"}
              onChange={(e) => handleInput(e.target as HTMLInputElement)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <label htmlFor="type-rugged">Rugged</label>
            <input
              type="radio"
              name="type"
              value="rugged"
              id="type-rugged"
              checked={formData.type === "rugged"}
              onChange={(e) => handleInput(e.target as HTMLInputElement)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="image">Upload an image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required
            onChange={(e) => handleInput(e.target as HTMLInputElement)}
          />
        </div>
        <Button as="button" colors="orange">
          Send data
        </Button>
      </form>
    </div>
  );
}
