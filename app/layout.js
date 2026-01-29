import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-V200GR36GV"; // Replace with your Google Analytics ID

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
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        
        <NavbarWrapper />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
