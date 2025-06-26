import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import AppProvider from "@/components/AppContext";
import Header from "@/components/Header";

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
            <Header/>
            {children}
            <footer>
                This is the footer
            </footer>
        </AppProvider>
      </body>
    </html>
  );
}
