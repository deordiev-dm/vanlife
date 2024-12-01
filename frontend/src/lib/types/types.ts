export type Van = {
  _id: string;
  hostId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number | string;
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

export type Transaction = {
  _id: string;
  sum: number;
  senderId: string;
  receiverId: string;
  vanId: string;
  createdAt: string;
};

export type Review = {
  _id: string;
  rate: 1 | 2 | 3 | 4 | 5;
  reviewBody?: string;
  reviewerId: string;
  vanId: string;
  van: Van;
  createdAt: string;
  updatedAt: string;
};
