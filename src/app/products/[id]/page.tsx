/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { getProductsDetails } from "@/services/getServices";
import Link from "next/link";
import ProductActions from "@/components/Shared/ProductActions";

interface Product {
  name: string;
  ratings: number;
  image: string;
  price: number;
  description: string;
  _id: string;
}

interface ProductDetailsResponse {
  product?: Product;
}

type Params = {
  id: string;
};

const productPage = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  const details = (await getProductsDetails(
    resolvedParams.id
  )) as ProductDetailsResponse;

  if (!details?.product) {
    return (
      <div className="container mx-auto p-6 ">
        <h2 className="text-2xl font-semibold">Service not found</h2>
        <p className="text-gray-600">
          The requested service details could not be found.
        </p>
      </div>
    );
  }

  const { name, ratings, image, price, description, _id } = details.product;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-6 md:p-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery Column */}
          <div className="space-y-6">
            <div className="relative group overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex justify-center items-center h-[400px]">
              {ratings > 0 && (
                <span className="absolute top-4 left-4 z-10 bg-sky-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Premium Selection
                </span>
              )}
              <img
                src={image || "/default-profile.jpg"}
                alt={name}
                className="object-contain w-full h-full max-h-[350px] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Stock Status Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                  ratings > 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    ratings > 0 ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                  }`} />
                  {ratings > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-none mb-3">
                {name}
              </h1>

              {/* Rating Block */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.min(5, Math.max(0, Math.round(ratings))) ? "fill-current" : "text-slate-200 fill-none stroke-current"}`}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-500">
                  {ratings || 0} / 5 Rating
                </span>
              </div>

              {/* Price Details */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-extrabold text-sky-600">${price}</span>
                {price && (
                  <span className="text-lg text-slate-400 line-through font-medium">
                    ${(Number(price) + 20).toFixed(0)}
                  </span>
                )}
                <span className="text-xs text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded ml-auto">
                  Save $20.00
                </span>
              </div>

              {/* Description */}
              <div className="prose prose-slate max-w-none mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {description || "No description available for this premium product."}
                </p>
              </div>
            </div>

            {/* Buy / Cart Actions */}
            <div className="border-t border-slate-100 pt-6">
              <ProductActions item={details.product} />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-6 text-center text-xs text-slate-500 font-medium">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center gap-1">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secured Checkout</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center gap-1">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>30-Day Returns</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center gap-1">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default productPage;
