import axios from "axios";
import { TService, TServiceDetails } from "@/types";

// Define the base URL for the API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Fetch all services
export const getServices = async (): Promise<TService[]> => {
  try {
    // Specify the response type to match the structure of the data
    const res = await axios.get<{ services: TService[] }>(
      `${BASE_URL}/services/api/get-all`
    );

    // Log the response data to check the structure
    console.log("Fetched services:", res.data);

    // Check if the response has a 'services' key and return its value
    if (res.status !== 200 || !res.data.services) {
      throw new Error(`Failed to fetch services: ${res.statusText}`);
    }

    // Return the array of services
    return res.data.services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return []; // Return an empty array in case of an error
  }
};

// Fetch service details by ID
export const getServicesDetails = async (
  id: string
): Promise<TServiceDetails> => {
  try {
    const res = await axios.get(`${BASE_URL}/services/api/${id}`);

    // Log the response data to check
    console.log("Fetched service details:", res.data);

    if (res.status !== 200) {
      throw new Error(`Failed to fetch service details: ${res.statusText}`);
    }

    return res.data as TServiceDetails;
  } catch (error) {
    console.error(`Error fetching service details for ID ${id}:`, error);
    return {} as TServiceDetails;
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
