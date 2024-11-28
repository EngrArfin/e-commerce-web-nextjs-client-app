// src/services/getServices.ts
import axios from "axios";
import { TService, TServiceDetails } from "@/types";

// Define the base URL for the API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Fetch all services
export const getServices = async (): Promise<TService[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/services/api/get-all`);

    // Assert that res.data is of type TService[]
    if (res.status !== 200) {
      throw new Error(`Failed to fetch services: ${res.statusText}`);
    }

    // Assert the type of res.data to be TService[]
    return res.data as TService[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return []; // return an empty array in case of error
  }
};

// Fetch service details by ID
export const getServicesDetails = async (
  id: string
): Promise<TServiceDetails> => {
  try {
    const res = await axios.get(`${BASE_URL}/services/api/${id}`);

    if (res.status !== 200) {
      throw new Error(`Failed to fetch service details: ${res.statusText}`);
    }

    // Assert the type of res.data to be TServiceDetails
    return res.data as TServiceDetails;
  } catch (error) {
    console.error(`Error fetching service details for ID ${id}:`, error);
    return {} as TServiceDetails; // Return empty object with type
  }
};

// Fetch all products
/* export const getProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products/api/getdata`);
    if (res.status !== 200) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    const products = res.data;
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
}; */
