import AdminSidebar from "@/src/components/AdminSidebar";
import { Bell, Mail } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      <AdminSidebar />
      <div className="p-6 py-4 bg-gray-200 flex-1 overflow-y-auto scrollbar-hide">
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
        <div className="bg-white shadow-md mt-4 h-full rounded-xl shadow-md p-4">
          {children}
        </div>
      </div>
    </main>
  );
}
