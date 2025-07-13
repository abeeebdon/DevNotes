"use client";
import { Bell, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

const AdminHeader = () => {
  const pathname = usePathname();
  const getHeaderContent = () => {
    switch (pathname) {
      case "/posts/create":
        return "Create Post";

      case "/posts/edit":
        return "Edit Post";

      case "/posts":
        return "All Posts";
      case "/dashboard":
        return "Welcome Back";
      case "/settings":
        return "Settings";
      case "/settings/users":
        return "User Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <article className="flex items-center bg-[#f5f2f2] justify-between  p-4 rounded-xl shadow-md">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{getHeaderContent()}</h2>
        <p className="text-sm">Write, share and lets learn</p>
      </div>
      <div className="flex items-center gap-4">
        <Bell />
        <Mail />
      </div>
    </article>
  );
};

export default AdminHeader;
