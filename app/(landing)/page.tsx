"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const samplePosts = [
  {
    title: "Getting Started with JavaScript",
    slug: "getting-started-with-javascript",
    date: "2025-06-15",
    description: "A beginner-friendly introduction to the JavaScript language.",
    category: "Beginner",
    content: `JavaScript is one of the most popular programming languages today...`,
  },
  {
    title: "How I Built My First Portfolio Website",
    slug: "how-i-built-my-first-portfolio",
    date: "2025-06-18",
    description:
      "A personal journey of building and launching my first dev portfolio.",
    category: "Story",
    content: `I started with no knowledge of design or deployment...`,
  },
  {
    title: "5 React Hooks You Should Know",
    slug: "5-react-hooks-you-should-know",
    date: "2025-07-01",
    description:
      "React hooks can transform how you write functional components...",
    category: "React",
    content: `React hooks like useState, useEffect, useMemo...`,
  },
  {
    title: "Understanding useEffect in React",
    slug: "understanding-useeffect-in-react",
    date: "2025-07-04",
    description:
      "Confused by useEffect? Let’s break it down with simple examples.",
    category: "React",
    content: `useEffect lets you synchronize your component with side effects...`,
  },
  {
    title: "Beginner’s Guide to Git and GitHub",
    slug: "beginners-guide-to-git-github",
    date: "2025-06-22",
    description:
      "Learn how to version control your code and collaborate using Git and GitHub.",
    category: "Beginner",
    content: `Version control is a must for any developer...`,
  },
  {
    title: "From HTML to React: My Transition Story",
    slug: "from-html-to-react-my-story",
    date: "2025-06-28",
    description:
      "Going from static HTML pages to React — my experience and advice.",
    category: "Story",
    content: `I started with simple HTML sites and soon felt limited...`,
  },
];

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
