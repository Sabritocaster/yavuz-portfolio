import { Inter } from "next/font/google"; // Using Inter as it's close to the design
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yavuz Dağdelen - Portfolio",
  description: "Graphic Designer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NavbarWrapper />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
