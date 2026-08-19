"use client";

import { useState } from "react";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
}

const ProductManagement = () => {
  const initialCategories: Category[] = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Apparel" },
    { id: 3, name: "Furniture" },
  ];

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editCategoryName, setEditCategoryName] = useState<string>("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const addCategory = () => {
    if (newCategoryName.trim() === "") {
      toast.error("Please enter a valid category name");
      return;
    }
    const newCategory: Category = {
      id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      name: newCategoryName.trim(),
    };
    setCategories([...categories, newCategory]);
    toast.success(`Category "${newCategoryName.trim()}" created successfully!`);
    setNewCategoryName("");
  };

  const startEditCategory = (id: number, name: string) => {
    setEditCategoryId(id);
    setEditCategoryName(name);
  };

  const confirmEditCategory = () => {
    if (editCategoryName.trim() === "") {
      toast.error("Category name cannot be empty");
      return;
    }
    setCategories(
      categories.map((category) =>
        category.id === editCategoryId
          ? { ...category, name: editCategoryName.trim() }
          : category
      )
    );
    toast.success("Category updated successfully!");
    setEditCategoryId(null);
    setEditCategoryName("");
  };

  const deleteCategory = (id: number) => {
    const target = categories.find(c => c.id === id);
    setCategories(categories.filter((category) => category.id !== id));
    toast.success(`Category "${target?.name || id}" removed successfully.`);
  };

  return (
    <div className="w-full space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            Category Management
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Create, edit, or delete categories for organize store catalog listings
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-1.5 text-xs font-semibold text-slate-500 w-fit">
          Categories: <span className="text-[#FF4E3E] font-bold">{categories.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card: Add Category Form */}
        <div className="border border-slate-100 rounded-2xl p-6 bg-white space-y-4 h-fit">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Add New Category
          </h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Category Name
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Health & Beauty"
                className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
              />
            </div>
            <button
              onClick={addCategory}
              className="w-full bg-[#FF4E3E] hover:bg-[#e03d2d] text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-[#FF4E3E]/10 transition duration-200"
            >
              Add Category
            </button>
          </div>
        </div>

        {/* Right Card: Category List Table */}
        <div className="lg:col-span-2 border border-slate-100 rounded-2xl p-6 bg-white space-y-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Categories List
          </h2>
          <div className="overflow-x-auto w-full border border-slate-100 rounded-xl">
            <table className="min-w-full divide-y divide-slate-100 bg-white">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-sm font-semibold text-slate-500">
                        {category.id}
                      </td>
                      <td className="py-3.5 px-4 text-sm font-bold text-slate-800">
                        {editCategoryId === category.id ? (
                          <input
                            type="text"
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                            className="border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl py-1 px-3 text-sm transition"
                          />
                        ) : (
                          category.name
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {editCategoryId === category.id ? (
                            <button
                              onClick={confirmEditCategory}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-3 rounded-lg text-xs transition duration-200"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                startEditCategory(category.id, category.name)
                              }
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1 px-3 rounded-lg text-xs transition duration-200"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-1 px-3 rounded-lg text-xs transition duration-200 shadow-sm shadow-rose-500/10"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-12 text-center text-sm font-semibold text-slate-400"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
