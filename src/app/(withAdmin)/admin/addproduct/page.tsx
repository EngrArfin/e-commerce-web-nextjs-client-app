"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

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
        const msg = "Product added successfully!";
        setSuccessMessage(msg);
        toast.success(msg);
      }
    } catch (error: any) {
      console.error("Error adding product:", error);
      const errMsg =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      setErrorMessage(errMsg);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Title block */}
      <div className="pb-4 border-b border-slate-100">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
          Add New Product
        </h1>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">
          Enter the specifications, upload images, and register a new item in the catalog
        </p>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm font-semibold shadow-sm">
          ✅ {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-sm font-semibold shadow-sm">
          ❌ {errorMessage}
        </div>
      )}

      {/* Product Form Card */}
      <div className="border border-slate-100 rounded-2xl p-6 bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="id" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Product ID / SKU
              </label>
              <input
                id="id"
                name="id"
                type="text"
                value={product.id}
                onChange={handleChange}
                placeholder="e.g. PROD-102"
                required
                className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={product.name}
                onChange={handleChange}
                placeholder="e.g. Wireless Headset Pro"
                required
                className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="price" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="stockQuantity" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Stock Quantity
              </label>
              <input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                value={product.stockQuantity}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="ratings" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Ratings (Initial)
              </label>
              <input
                id="ratings"
                name="ratings"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={product.ratings}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="category" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition bg-white"
              >
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="sports">Sports</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the product features..."
              required
              rows={4}
              className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="image" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Product Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full border border-slate-200 file:border-0 file:bg-slate-100 file:hover:bg-slate-200 file:text-slate-700 file:text-xs file:font-bold file:py-2.5 file:px-4 file:rounded-lg file:mr-4 outline-none rounded-xl p-1.5 text-sm transition cursor-pointer"
              required
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-[#FF4E3E] hover:bg-[#e03d2d] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md shadow-[#FF4E3E]/10 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
