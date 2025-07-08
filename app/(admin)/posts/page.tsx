import { Search } from "lucide-react";

const page = () => {
  return (
    <section>
      <article className="flex gap-6">
        <div className="flex items-center max-w-3xl border border-gray-300 rounded-xl shadow w-full gap-2 p-2">
          <Search />
          <input
            type="text"
            placeholder="Search posts"
            className="w-full p-2 border-none outline-none "
          />
        </div>
      </article>
    </section>
  );
};

export default page;
