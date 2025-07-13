"use client";
import {
  CatIcon,
  Command,
  Home,
  Menu,
  Pencil,
  Settings,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: <Home /> },
  { href: "/posts", label: "Posts", icon: <User /> },
  { href: "/comments", label: "Comments", icon: <Command /> },
  { href: "/settings", label: "Settings", icon: <Settings /> },
  { href: "/categories", label: "Categories", icon: <CatIcon /> },
];
const AdminSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <aside className="py-6 flex flex-col justify-between p-4 md:h-screen overflow-y-auto bg-[#2D2D2040] border-r border-[#b1b19f]">
      {/* header logo  */}
      <div>
        <header className="md:hidden flex items-center justify-between">
          <h2 className="text-[#deff0b] text-2xl font-bold">DevNotes</h2>
          <button
            className="cursor-pointer"
            onClick={() => setShowSidebar(true)}
          >
            {!showSidebar && <Menu />}
          </button>
        </header>
        <section className="mt-6 hidden md:block">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              <div
                key={link.href}
                className="flex items-center py-4 hover:bg-gray-100 transition-colors"
              >
                <div className="mr-2 text-gray-600">{link.icon}</div>
                <span className="text-gray-800">{link.label}</span>
              </div>
            </Link>
          ))}
        </section>
      </div>

      <button className="hidden md:block">
        <Link
          href="/posts/create"
          className="flex items-center py-3 hover:border hover:border-gray-700 bg-gray-700/50 rounded-xl justify-center text-white hover:bg-gray-100 transition-colors"
        >
          <div className="mr-2 text-gray-600">
            <Pencil size={16} />
          </div>
          <span className="text-gray-800">Create Post</span>
        </Link>
      </button>
      {showSidebar && (
        <aside className="fixed right-0 w-8/10 max-w-[250px] shadow bg-[#f5f2f2] px-6 pt-10 z-50 top-0 bottom-0">
          <div className="mb-10 flex justify-end">
            <X
              className="cursor-pointer"
              onClick={() => setShowSidebar(false)}
            />
          </div>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setShowSidebar(false)}
            >
              <div
                key={link.href}
                className="flex items-center py-4 hover:bg-gray-300 transition-colors"
              >
                <div className="mr-2 text-gray-600">{link.icon}</div>
                <span className="text-gray-800">{link.label}</span>
              </div>
            </Link>
          ))}
        </aside>
      )}
    </aside>
  );
};

export default AdminSidebar;
