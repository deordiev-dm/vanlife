export type Van = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  type: "simple" | "rugged" | "luxury";
  hostId: string;
  state?: { searchParams: string }; // todo: get rid of this
};

export type VanPreview = Omit<Van, "description" | "hostId">;
