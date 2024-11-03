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
  description: string;
};

export interface TService {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
}

export interface TUserData {
  _id: string;
  email: string;
  name: string;
  imge: string;
  price: number;
}
