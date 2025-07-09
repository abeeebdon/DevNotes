import { Lock, User } from "lucide-react";
import Link from "next/link";

const settingsLink = [
  { icon: <User />, title: "Manage User", href: "/settings/users" },
  { icon: <Lock />, title: "Password Management", href: "/settings/passwords" },
  { icon: <User />, title: "Profile Management", href: "/settings/profile" },
];
const SettingsPage = () => {
  return (
    <div>
      <section className="flex items-center  gap-6">
        {settingsLink.map((set) => {
          return (
            <Link
              href={set.href}
              className="flex items-center gap-4 bg-white p-2  px-4 rounded-xl shadow"
            >
              {set.icon}
              {set.title}
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default SettingsPage;
