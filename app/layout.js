import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";

export const metadata = {
  title: "Yavuz Dağdelen - Portfolio",
  description: "Graphic Designer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/foj2kuj.css" />
      </head>
      <body className="flex flex-col min-h-screen">
        <NavbarWrapper />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
