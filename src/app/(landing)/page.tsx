"use client";

import { samplePosts } from "@/src/components/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

const blogTopics = [
  { name: "JavaScript", slug: "javascript" },
  { name: "Python", slug: "python" },
  { name: "Dart", slug: "dart" },
  { name: "React", slug: "react" },
  { name: "Beginner", slug: "beginner" },
  { name: "Story", slug: "story" },
];

const trendingArray = ["JavaScript", "Python", "React", "Story"];

export default function Home() {
  const [filterPosts, setFilterPosts] = useState(samplePosts);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    if (!selectedTopic) {
      setFilterPosts(samplePosts);
    } else {
      setFilterPosts(
        samplePosts.filter(
          (post) => post.category.toLowerCase() === selectedTopic.toLowerCase()
        )
      );
    }
  }, [selectedTopic]);

  return (
    <main>
      {/* Hero Section */}
      <section
        className="h-[400px] sm:h-[440px] flex justify-center items-center px-4 sm:px-6 py-10 text-center bg-cover bg-center shadow-lg text-white"
        style={{ backgroundImage: "url('/bg1.jpg')" }}
      >
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Welcome to DevNotes
          </h1>
          <p className="text-base sm:text-lg text-gray-100">
            Find all solutions to your bugs in JavaScript, Python and Dart
            programming languages
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="flex flex-col md:flex-row gap-10 items-start justify-between px-4 sm:px-6 py-12">
        {/* Sidebar – Blog Topics */}
        <aside className="w-full md:w-1/3  md:max-w-[300px] text-center md:text-left">
          <h2 className="text-blue-700 font-bold text-2xl">Blog Topics</h2>
          <div className="flex flex-row overflow-auto scrollbar-hide md:flex-col gap-4 mt-6  md:justify-start">
            <button
              onClick={() => setSelectedTopic("")}
              className={`px-4 py-2 rounded text-sm block w-full md:w-auto ${
                selectedTopic === ""
                  ? "font-bold text-blue-700"
                  : "text-gray-700"
              } hover:underline`}
            >
              All Topics
            </button>
            {blogTopics.map((topic) => (
              <button
                key={topic.slug}
                onClick={() => setSelectedTopic(topic.name)}
                className={`px-4 py-2 rounded text-sm w-full md:w-auto ${
                  selectedTopic === topic.name
                    ? "font-bold text-blue-700"
                    : "text-gray-700"
                } hover:underline`}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content – Blog Posts */}
        <div className="flex-1 w-full">
          {/* Trending Topics */}
          <article className="hidden md:block mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Trending Topics
            </h2>
            <div className="flex flex-wrap gap-3">
              {trendingArray.map((topic) => (
                <div
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`cursor-pointer px-4 py-2 rounded-full text-sm border transition ${
                    selectedTopic === topic
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-transparent text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  }`}
                >
                  {topic}
                </div>
              ))}
            </div>
          </article>

          {/* Blog List */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            All Blog Posts
          </h1>
          <ul className="space-y-6">
            {filterPosts.map(({ slug, title, date, description, category }) => (
              <li key={slug} className="border-b pb-4">
                <Link href={`/blog/${slug}`}>
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-600 hover:underline">
                    {title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500">
                  {date} · {category}
                </p>
                <p className="mt-1 text-gray-700 text-sm">{description}</p>
              </li>
            ))}
            {filterPosts.length === 0 && (
              <p className="text-gray-500 text-sm">
                No posts found for "{selectedTopic}"
              </p>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
