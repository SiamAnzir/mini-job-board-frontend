"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-primary font-bold text-xl">
          Job Board
        </Link>

        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className={pathname === "/" ? "text-primary font-semibold" : ""}
          >
            Home
          </Link>
          {isLoggedIn && <Link href="/jobs/create">Create Job</Link>}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-600">
              Logout
            </button>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
