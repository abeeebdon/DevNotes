import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About | DevNotes</title>
      </Head>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">About Me</h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          Hi, I'm Abeeb Maroof — a passionate frontend developer who loves
          turning ideas into clean, responsive interfaces. I started this blog
          to document what I learn, share tutorials, and hopefully help other
          developers grow along the way.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Whether it's building React apps, exploring new tools in the
          JavaScript ecosystem, or just writing about my journey as a developer
          — this blog is my learning playground and digital journal.
        </p>

        <p className="text-gray-700 leading-relaxed">
          When I'm not coding, I enjoy reading, learning about product design,
          and sometimes just experimenting with side projects.
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Let’s connect</h2>
          <ul className="text-blue-600 space-y-2">
            <li>
              <a href="mailto:you@example.com" className="hover:underline">
                📧 Email
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                💻 GitHub
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                🐦 Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
