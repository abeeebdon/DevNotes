import Link from "next/link";

const samplePosts = [
  {
    title: "Getting Started with JavaScript",
    slug: "getting-started-with-javascript",
    date: "2025-06-15",
    description: "A beginner-friendly introduction to the JavaScript language.",
    category: "Beginner",
    content: `JavaScript is one of the most popular programming languages today. In this post, we’ll explore the basics of variables, functions, and loops — everything you need to write your first JS app.`,
  },
  {
    title: "How I Built My First Portfolio Website",
    slug: "how-i-built-my-first-portfolio",
    date: "2025-06-18",
    description:
      "A personal journey of building and launching my first dev portfolio.",
    category: "Story",
    content: `I started with no knowledge of design or deployment. After lots of tutorials and many errors, I finally built and deployed my portfolio using HTML, CSS, and Netlify. Here's what I learned...`,
  },
  {
    title: "5 React Hooks You Should Know",
    slug: "5-react-hooks-you-should-know",
    date: "2025-07-01",
    description:
      "React hooks can transform how you write functional components. Here are the most useful ones.",
    category: "React",
    content: `React hooks like useState, useEffect, useMemo, useCallback, and useRef are game changers. This post breaks down how and when to use each of them with real-world examples.`,
  },
  {
    title: "Understanding useEffect in React",
    slug: "understanding-useeffect-in-react",
    date: "2025-07-04",
    description:
      "Confused by useEffect? Let’s break it down with simple explanations and examples.",
    category: "React",
    content: `useEffect lets you synchronize your component with side effects like fetching data or listening to scroll. This guide shows how dependency arrays and cleanup work in plain English.`,
  },
  {
    title: "Beginner’s Guide to Git and GitHub",
    slug: "beginners-guide-to-git-github",
    date: "2025-06-22",
    description:
      "Learn how to version control your code and collaborate using Git and GitHub.",
    category: "Beginner",
    content: `Version control is a must for any developer. This post covers basic Git commands, how to make commits, push to GitHub, and create pull requests with confidence.`,
  },
  {
    title: "From HTML to React: My Transition Story",
    slug: "from-html-to-react-my-story",
    date: "2025-06-28",
    description:
      "Going from static HTML pages to building dynamic apps with React — my experience and advice.",
    category: "Story",
    content: `I started with simple HTML sites and soon felt limited. Learning React opened new doors — reusable components, hooks, and state made building apps fun again. Here’s my journey.`,
  },
];

export default function Home() {
  return (
    <main>
      {/* header section goes here  */}

      {/* header completed  */}
      {/* hero section  */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-lg text-gray-600">
          Sharing thoughts, tutorials, and stories from my journey as a
          developer.
        </p>
      </section>

      {/* all blogs */}
      <main className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>

        <ul className="space-y-6">
          {samplePosts.map(({ slug, title, date, description, category }) => (
            <li key={slug} className="border-b pb-4">
              <Link href={`/blog/${slug}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                  {title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500">
                {date} · {category}
              </p>
              <p className="mt-1 text-gray-700">{description}</p>
            </li>
          ))}
        </ul>
      </main>
    </main>
  );
}
