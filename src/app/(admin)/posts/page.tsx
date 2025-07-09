"use client";
import { samplePosts } from "@/src/components/constants";
import {
  LucidePencil,
  MessageCircle,
  Search,
  SquarePen,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <section>
      <article className="flex gap-6 items-center justify-between">
        <div className="flex items-center max-w-3xl border border-gray-300 rounded-xl shadow w-full gap-2 p-2">
          <Search />
          <input
            type="text"
            placeholder="Search posts"
            className="w-full p-2 py-1 border-none outline-none "
          />
        </div>
        <button
          className="group relative cursor-pointer"
          onClick={() => router.push("/posts/create")}
        >
          <SquarePen />
          <p className="hidden absolute top-full -left-10 w-20  group-hover:block text-xs">
            Create Posts
          </p>
        </button>
      </article>
      <ul className="space-y-6 mt-6 px-2">
        {samplePosts.map(
          ({ slug, title, date, description, category, likes, comments }) => (
            <li key={slug} className="pb-4">
              <Link href={`/posts/${slug}`}>
                <h2 className="text-lg sm:text-xl font-semibold text-blue-600 hover:underline">
                  {title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500">
                {date} · {category}
              </p>
              <p className="mt-1 text-gray-700 text-sm">{description}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {likes}
                  <ThumbsUp size={12} />
                </div>
                <div className="flex items-center gap-1">
                  {comments}
                  <MessageCircle size={12} />
                </div>
              </div>
            </li>
          )
        )}
        {/* {filterPosts.length === 0 && (
          <p className="text-gray-500 text-sm">
            No posts found for "{selectedTopic}"
          </p>
        )} */}
      </ul>
    </section>
  );
};

export default page;
