import AdminHeader from "@/src/components/AdminHeader";
import AdminSidebar from "@/src/components/AdminSidebar";
import { Bell, Mail, Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* mobile header  */}

      <div className="w-full md:w-64  ">
        <AdminSidebar />
      </div>
      <div className="p-4 md:p-6 py-4 bg-[#2D2D2030] md:w-2/3   flex-1 ">
        <AdminHeader />
        <div className=" bg-[#f5f2f2] shadow-md h-[82vh] mt-4 overflow-y-auto scrollbar-hide rounded-xl  p-4">
          {children}
        </div>
      </div>
    </main>
  );
}
