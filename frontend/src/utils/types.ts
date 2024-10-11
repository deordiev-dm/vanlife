export type Van = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  type: "simple" | "rugged" | "luxury";
  hostId: string;
};
