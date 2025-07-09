import AdminHeader from "@/src/components/AdminHeader";
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
        <AdminHeader />
        <div className="bg-white shadow-md mt-4 h-full rounded-xl  p-4">
          {children}
        </div>
      </div>
    </main>
  );
}
