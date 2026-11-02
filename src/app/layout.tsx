import { Bebas_Neue, Manrope } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default:
      "Elite Body Fitness Pros | Personalized Science-Based Training",
    template: "%s | Elite Body Fitness Pros",
  },
  description:
    "At Elite Body Fitness Pros, we deliver personalized, science-based training that fits your schedule and transforms your results. Unleash the strongest version of you.",
  keywords: [
    "Elite Body Fitness Pros",
    "personal training",
    "fitness coaching",
    "strength training",
    "online coaching",
    "science-based training",
  ],
  openGraph: {
    title: "Elite Body Fitness Pros",
    description:
      "At Elite Body Fitness Pros, we deliver personalized, science-based training that fits your schedule and transforms your results.",
    siteName: "Elite Body Fitness Pros",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#05070c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
