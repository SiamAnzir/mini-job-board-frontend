"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { successToastMessage } from "../utils/toastifyUtils";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { token, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCreateJob = () => {
    if (token) {
      router.push("/create-job");
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    successToastMessage("Logged Out Successfully");
  };

  return (
    <nav className="bg-green-800 text-white shadow-sm">
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
          <button onClick={handleCreateJob}>Create Job</button>
          {token ? <button onClick={handleLogout}>Logout</button> : <></>}
          {showAuthModal && (
            <AuthModal
              onClose={() => setShowAuthModal(false)}
              onSuccess={() => router.push("/create-job")}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
