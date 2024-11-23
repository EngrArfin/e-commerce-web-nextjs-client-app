const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/* import axios from "axios"; */

export const getServices = async () => {
  try {
    const res = await fetch(`${BASE_URL}/services/api/get-all`);
    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.statusText}`);
    }
    const services = await res.json();
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const getServicesDetails = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/services/api/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch service details: ${res.statusText}`);
    }
    const services = await res.json();
    return services;
  } catch (error) {
    console.error(`Error fetching service details for ID ${id}:`, error);
    return {};
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products/api/getdata`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    const products = await res.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
