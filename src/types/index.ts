export type TProductCardProps = {
  _id: string;
  id: string;
  productName: string;
  productId: string;
  name: string;
  rating: number;
  brand: string;
  availableQuantity: number;
  price: number;
  image: string;
  quantity: number;
  description: string; // Add this line if needed
};

export interface TService {
  _id: string; // Unique identifier for the service
  title: string; // Title of the service
  description: string; // Description of the service
  img: string; // Image URL of the service
  price: number; // Price of the service
}

export interface TUserData {
  _id: string;
  email: string; // Title of the service
  name: string; // Description of the service
  imge: string; // Image URL of the service
  price: number; // Price of the service
}
