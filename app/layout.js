import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Job Board",
  description: "Find your next career opportunity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <AuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
