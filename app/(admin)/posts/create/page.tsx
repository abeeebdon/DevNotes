import { Bell, Mail, Plus } from "lucide-react";

const categories = [
  { name: "Technology" },
  { name: "Health" },
  { name: "Lifestyle" },
  { name: "Education" },
  { name: "Travel" },
];
const page = () => {
  return (
    <section className=" h-full">
      <article className="flex items-center bg-white justify-between  p-4 rounded-xl shadow-md">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Create Posts</h2>
          <p className="text-sm">Write, share and lets learn</p>
        </div>
        <div className="flex items-center gap-4">
          <Bell />
          <Mail />
        </div>
      </article>
      <article className="flex h-full  gap-4 mt-4">
        <article className="bg-white w-1/3  justify-between h-full  p-4 rounded-xl shadow-md">
          <h2>Post Details</h2>
          <div className="border-2 mt-4 border-dotted flex items-center justify-center rounded-2xl  h-30 ">
            <Plus />
            Create Post
          </div>
          <article className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Post Title"
                className="w-full p-2 border rounded-md mt-2"
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="w-full p-2 border rounded-md mt-2"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                type="text"
                placeholder="Add tags (comma separated)"
                className="w-full p-2 border rounded-md mt-2"
              />
            </div>
          </article>
        </article>
        <section className="bg-white w-2/3  justify-between h-full  p-4 rounded-xl shadow-md">
          <article className="flex items-center justify-between">
            <div className="flex items-center border border-gray-200">
              <span>B</span>
            </div>
            <div className="flex items-center bg-white p-4 rounded-xl shadow-md">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Publish
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400 transition-colors">
                Save Draft
              </button>
            </div>
          </article>
          <article className="mt-4">
            <h2 className="text-center my-4">Chapter Title Here</h2>
            <textarea
              className="w-full h-70  p-4 border rounded-md mt-2"
              placeholder="Write your post content here..."
            ></textarea>
            <p></p>
          </article>
        </section>
      </article>
    </section>
  );
};

export default page;
