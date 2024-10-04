import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav-bar";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "../src/utils/theme/theme-provider"; // Import the Providers component

const lexend = Lexend({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // title: "Ninja school online",
  // description: "Ninja school online",
  // icons: [
  //   {
  //     rel: "icon",
  //     type: "image/png",
  //     sizes: "16x16",
  //     url: "/favicon.png",
  //   },
  //   {
  //     rel: "icon",
  //     type: "image/png",
  //     sizes: "32x32",
  //     url: "/favicon.png",
  //   },
  // ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={`${lexend.className} antialiased flex flex-col w-full`}
        >
          {" "}
          {/* Wrap the children with Providers */}
          <NavBar />
          <div className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center py-8">
            {children}
          </div>
          <Footer />
          <ToastContainer />
        </body>
      </ThemeProvider>
    </html>
  );
}
