import Image from "next/image";

export default function AuthPage() {
  return (
    <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h2>
        <p className="text-gray-500">Sign in to continue to DevNotes</p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600">
              <input type="checkbox" className="mr-1" />
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
