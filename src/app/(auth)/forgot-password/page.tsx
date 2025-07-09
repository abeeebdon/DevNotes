"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/otp-verification");
  };
  return (
    <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h2>

        <p className="text-sm text-gray-600">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="text-center bg-blue-700 text-white w-full py-2 rounded hover:bg-amber-600 transition"
          >
            Send OTP
          </button>
        </form>
        <p className="text-sm text-gray-600">
          If you don't receive an email, check your spam folder or try a
          different email address.
        </p>
      </div>
    </section>
  );
};

export default page;
