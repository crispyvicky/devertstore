import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sparkles,
  LogOut,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inventory", label: "Inventory", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/recommendations", label: "AI Recs", icon: Sparkles },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f1ea]">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="hidden w-64 shrink-0 border-r border-[#1c1c1c] px-5 py-8 md:block">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.3em] text-[#c6a572] uppercase">
              Devert Store
            </p>
            <h1 className="font-display mt-1 text-2xl">Admin</h1>
          </div>
          <nav className="space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#cfc8bb] transition hover:bg-[#121212] hover:text-white"
              >
                <item.icon size={16} className="text-[#c6a572]" />
                {item.label}
              </Link>
            ))}
          </nav>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
            className="mt-10"
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-[#9a9488] transition hover:text-white"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-[#1c1c1c] px-6 py-4">
            <div className="md:hidden">
              <p className="text-[10px] tracking-[0.25em] text-[#c6a572] uppercase">
                Devert Store
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm">{session.user.name}</p>
              <p className="text-[11px] tracking-[0.12em] text-[#9a9488] uppercase">
                {(session.user as { role?: string }).role || "Admin"}
              </p>
            </div>
          </header>

          <div className="flex gap-2 overflow-x-auto border-b border-[#1c1c1c] px-4 py-2 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap border border-[#222] px-3 py-1.5 text-xs tracking-[0.12em] uppercase"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
