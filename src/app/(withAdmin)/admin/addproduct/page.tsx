"use client";

import { useState } from "react";
import axios from "axios";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    category: "electronics",
    image: null as File | null,
    ratings: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === "price" || name === "stockQuantity" || name === "ratings"
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: files && files[0] ? files[0] : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("id", product.id);
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", String(product.price));
      formData.append("stockQuantity", String(product.stockQuantity));
      formData.append("ratings", String(product.ratings));
      formData.append("category", product.category);

      if (product.image) {
        formData.append("image", product.image);
      }

      const response = await axios.post("/admin/addproduct/api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setProduct({
          id: "",
          name: "",
          description: "",
          price: 0,
          stockQuantity: 0,
          category: "electronics",
          image: null,
          ratings: 0,
        });
        setSuccessMessage("Product added successfully!");
      }
    } catch (error: any) {
      console.error("Error adding product:", error);
      setErrorMessage(
        error?.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-medium text-center mb-5 text-gray-900 truncate">
            Add New Product
          </h1>

          {successMessage && (
            <p className="mb-6 text-center text-lg font-medium text-green-600">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="mb-6 text-center text-lg font-medium text-red-600">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="id"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Product ID
                </label>
                <input
                  id="id"
                  name="id"
                  type="text"
                  value={product.id}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-200 px-4 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-200 px-4 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Price ($)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-200 px-4 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="stockQuantity"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Stock Quantity
                </label>
                <input
                  id="stockQuantity"
                  name="stockQuantity"
                  type="number"
                  value={product.stockQuantity}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-200 px-4 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="ratings"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Ratings
                </label>
                <input
                  id="ratings"
                  name="ratings"
                  type="number"
                  value={product.ratings}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-200 px-4 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-200 px-4 py-2"
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-200 px-4 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="image"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
