import AdminSidebar from "@/src/components/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      <AdminSidebar />
      <div className="p-6 bg-gray-200 flex-1 overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </main>
  );
}
