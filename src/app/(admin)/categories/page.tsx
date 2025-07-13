"use client";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// Define the Category type
type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
};

// Dummy data for categories
const initialCategories: Category[] = [
  {
    id: 1,
    name: "Technology",
    slug: "technology",
    description: "Articles about the latest in tech, software, and hardware.",
    postCount: 15,
  },
  {
    id: 2,
    name: "Health & Wellness",
    slug: "health-wellness",
    description: "Tips and guides for a healthier lifestyle.",
    postCount: 22,
  },
  {
    id: 3,
    name: "Food & Recipes",
    slug: "food-recipes",
    description: "Delicious recipes and culinary insights.",
    postCount: 18,
  },
  {
    id: 4,
    name: "Travel",
    slug: "travel",
    description: "Explore the world with our travel guides and stories.",
    postCount: 10,
  },
  {
    id: 5,
    name: "Finance",
    slug: "finance",
    description:
      "Personal finance tips, investment strategies, and economic news.",
    postCount: 7,
  },
];

const Category = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categorySlug, setCategorySlug] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  // Calculate next category ID based on current categories
  const nextCategoryId = useMemo(() => {
    return categories.length > 0
      ? Math.max(...categories.map((c) => c.id)) + 1
      : 1;
  }, [categories]);

  // Filtered categories based on search term
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        category.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        category.slug.toLowerCase().includes(lowerCaseSearchTerm) ||
        (category.description &&
          category.description.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });
  }, [categories, searchTerm]);

  // Open modal for adding or editing a category
  const openCategoryDetailModal = (category: Category | null = null) => {
    setEditingCategory(category);
    if (category) {
      setCategoryName(category.name);
      setCategorySlug(category.slug);
      setCategoryDescription(category.description || "");
    } else {
      setCategoryName("");
      setCategorySlug("");
      setCategoryDescription("");
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeCategoryDetailModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setCategoryName("");
    setCategorySlug("");
    setCategoryDescription("");
  };

  // Handle saving (add/edit) a category
  const handleSaveCategory = () => {
    if (!categoryName.trim() || !categorySlug.trim()) {
      console.log("Category Name and Slug are required.");
      return;
    }

    if (editingCategory) {
      // Edit existing category
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                name: categoryName.trim(),
                slug: categorySlug.trim(),
                description: categoryDescription.trim(),
              }
            : cat
        )
      );
      console.log(`Category "${categoryName}" updated.`);
    } else {
      // Add new category
      const newCategory: Category = {
        id: nextCategoryId,
        name: categoryName.trim(),
        slug: categorySlug.trim(),
        description: categoryDescription.trim(),
        postCount: 0,
      };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      console.log(`Category "${categoryName}" added.`);
    }
    closeCategoryDetailModal();
  };

  // Handle deleting a single category
  const handleDeleteCategory = (categoryId: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== categoryId)
      );
      console.log(`Category ${categoryId} deleted.`);
    }
  };

  // Handle checkbox change for bulk actions
  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategoryIds((prev) => [...prev, id]);
    } else {
      setSelectedCategoryIds((prev) => prev.filter((catId) => catId !== id));
    }
  };

  // Handle select all checkbox
  const handleSelectAllChange = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategoryIds(filteredCategories.map((cat) => cat.id));
    } else {
      setSelectedCategoryIds([]);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedCategoryIds.length === 0) {
      console.log("No categories selected for bulk action.");
      return;
    }

    if (action === "delete") {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedCategoryIds.length} selected categories?`
        )
      ) {
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => !selectedCategoryIds.includes(cat.id))
        );
        console.log(`${selectedCategoryIds.length} categories deleted.`);
      }
    } else {
      console.log("Please select a valid bulk action.");
    }
    setSelectedCategoryIds([]);
  };

  return (
    <>
      <div className=" ">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 ">
          Categories Management
        </h1>

        {/* Filter and Search Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3 flex rounded-lg px-4 items-center border border-gray-300 gap-2">
            <Search color="#d1d5dc" />
            <input
              type="text"
              placeholder="Search Categories..."
              className="w-full  pr-4 py-2   border-none outline-none  transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col  sm:flex-row w-full md:w-1/2 space-y-4 sm:space-y-0 sm:space-x-4 justify-end">
            <button
              onClick={() => openCategoryDetailModal()}
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 flex items-center gap-2"
            >
              <Plus />
              Add New Category
            </button>
          </div>
        </div>

        {/* Categories Table */}
        <div className="overflow-x-auto rounded-lg hidden md:block md:shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                    onChange={(e) => handleSelectAllChange(e.target.checked)}
                    checked={
                      selectedCategoryIds.length ===
                        filteredCategories.length &&
                      filteredCategories.length > 0
                    }
                    disabled={filteredCategories.length === 0}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post Count
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                  >
                    No categories found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                        checked={selectedCategoryIds.includes(category.id)}
                        onChange={(e) =>
                          handleCheckboxChange(category.id, e.target.checked)
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-500">
                      {category.description || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.postCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 cursor-pointer hover:text-indigo-900 relative mr-3 group edit-comment-btn"
                        onClick={() => openCategoryDetailModal(category)}
                      >
                        <Pencil size={16} />
                        <span className="hidden group-hover:block text-xs absolute top-full">
                          Edit
                        </span>
                      </button>
                      <button
                        className="text-red-600 relative group cursor-pointer hover:text-red-900 delete-comment-btn"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 size={16} />
                        <span className="hidden group-hover:block text-xs absolute top-full">
                          Delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="block md:hidden space-y-4 mt-4">
          {filteredCategories.length === 0 ? (
            <div className="text-center text-gray-500">
              No categories found.
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow p-4 space-y-2 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </p>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                    checked={selectedCategoryIds.includes(category.id)}
                    onChange={(e) =>
                      handleCheckboxChange(category.id, e.target.checked)
                    }
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <strong>Slug:</strong> {category.slug}
                </div>
                <div className="text-sm text-gray-500">
                  <strong>Description:</strong> {category.description || "—"}
                </div>
                <div className="text-sm text-gray-500">
                  <strong>Post Count:</strong> {category.postCount}
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <button
                    className="text-indigo-600 text-sm font-medium"
                    onClick={() => openCategoryDetailModal(category)}
                  >
                    <Pencil size={16} className="inline-block mr-1" />
                    Edit
                  </button>
                  <button
                    className="text-red-600 text-sm font-medium"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 size={16} className="inline-block mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Category Detail Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-6 sm:p-8 transform transition-transform duration-300">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <button
                  onClick={closeCategoryDetailModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-gray-700">
                <div>
                  <label
                    htmlFor="category-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="category-name"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="category-slug"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Slug
                  </label>
                  <input
                    type="text"
                    id="category-slug"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    The "slug" is the URL-friendly version of the name. It is
                    usually all lowercase and contains only letters, numbers,
                    and hyphens.
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="category-description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="category-description"
                    rows={3}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    The description is not prominent by default; however, some
                    themes may show it.
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSaveCategory}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                >
                  Save Category
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
