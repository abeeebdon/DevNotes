"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="w-full border-b">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          DevNotes
        </Link>
        <button className="md:hidden p-2 rounded hover:bg-gray-100 outline-none ">
          <Menu onClick={() => setShowMenu(true)} />
        </button>
        {showMenu && (
          <div className="fixed inset-0 bg-white  p-4 md:hidden">
            <button className="flex justify-end w-full mb-4 cursor-pointer">
              <X onClick={() => setShowMenu(false)} />
            </button>
            <div className="flex flex-col items-center h-[50%] mt-10 justify-between">
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  onClick={() => setShowMenu(false)}
                  className="text-lg text-gray-700 hover:text-blue-600 mb-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
        <nav className="space-x-4 hidden md:block text-sm text-gray-700">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
