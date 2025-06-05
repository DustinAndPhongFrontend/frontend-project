import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import AppProvider from "@/components/AppContext";

export const metadata: Metadata = {
  title: "RPG",
  description: "Dustin and Phong's Frontend Project",
};

const unifrakturMaguntia = localFont({
  src: './UnifrakturMaguntia-Regular.ttf',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${unifrakturMaguntia.className} antialiased`}
      >
        <AppProvider>
            {children}
        </AppProvider>
      </body>
    </html>
  );
}
