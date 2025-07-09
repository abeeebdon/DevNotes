import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {children}
      <section className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center px-10">
        <div className="text-center">
          <Image
            src="/auth-illustration.svg"
            alt="Auth Illustration"
            width={400}
            height={300}
            className="mx-auto mb-6"
          />
          <h3 className="text-2xl font-semibold text-blue-700">DevNotes</h3>
          <p className="text-gray-600 mt-2">
            A blog for developers, by a developer.
          </p>
        </div>
      </section>
    </main>
  );
}
