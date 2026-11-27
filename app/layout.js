import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Script from "next/script";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  INSTAGRAM_URL,
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  baseOpenGraph,
  baseTwitter,
  JsonLd,
} from "@/lib/seo";

const GA_MEASUREMENT_ID = "G-V200GR36GV"; // Replace with your Google Analytics ID

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Yavuz Dağdelen",
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Yavuz Dağdelen",
    "graphic designer",
    "graphic design portfolio",
    "branding",
    "editorial design",
    "poster design",
    "UI/UX design",
    "motion design",
    "Bilkent University",
    "Ankara",
  ],
  openGraph: {
    ...baseOpenGraph,
    type: "website",
    title: "Yavuz Dağdelen",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    ...baseTwitter,
    title: "Yavuz Dağdelen",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE_NAME,
      url: SITE_URL,
      image: absoluteUrl(DEFAULT_OG_IMAGE),
      jobTitle: "Graphic Design Student",
      description: SITE_DESCRIPTION,
      email: "mailto:yavuz.mountain@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ankara",
        addressCountry: "TR",
      },
      alumniOf: { "@type": "HighSchool", name: "Bursa Anatolian High School" },
      affiliation: [
        { "@type": "CollegeOrUniversity", name: "Bilkent University" },
        { "@type": "CollegeOrUniversity", name: "Academy of Fine Arts in Gdańsk" },
      ],
      knowsAbout: [
        "Graphic Design",
        "Branding",
        "Editorial Design",
        "Poster Design",
        "UI/UX Design",
        "Motion Design",
        "Typography",
      ],
      sameAs: [INSTAGRAM_URL],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
  ],
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/foj2kuj.css" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd data={siteJsonLd} />
      </head>
      <body className="flex flex-col min-h-screen min-h-dvh bg-white">
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
