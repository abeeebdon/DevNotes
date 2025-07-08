import { Command, Home, Pen, Pencil, Settings, User } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: <Home /> },
  { href: "/posts", label: "Posts", icon: <User /> },
  { href: "/comments", label: "Comments", icon: <Command /> },
  { href: "/notifications", label: "Settings", icon: <Settings /> },
];
const AdminSidebar = () => {
  return (
    <aside className="py-6 flex flex-col justify-between p-4 w-64 bg-white border-r">
      {/* header logo  */}
      <div>
        <h2>DevNotes</h2>
        <section className="mt-6">
          {links.map((link) => (
            <Link href={link.href}>
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

      <button>
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
    </aside>
  );
};

export default AdminSidebar;
