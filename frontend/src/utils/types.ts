export type Van = {
  _id: string;
  hostId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  type: "simple" | "rugged" | "luxury";
};

export type User = {
  _id: string;
  name: string;
  role: "host" | "renter" | "demo";
};

export type SignUpUser = {
  name: string;
  email: string;
  password: string;
  role: "host" | "renter";
};
