const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getServices = async () => {
  const res = await fetch(`${BASE_URL}/services/api/get-all`);
  const services = await res.json();
  return services;
};

export const getServicesDetails = async (id: string) => {
  const res = await fetch(`${BASE_URL}/services/api/${id}`);
  const services = await res.json();
  return services;
};

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products/api/getdata`);
  const products = await res.json();
  return products;
};
