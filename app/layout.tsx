import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import AppProvider from "@/components/AppContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Medieval Times",
  description: "Dustin and Phong's Frontend Project",
};

const germaniaOne = localFont({
  src: './GermaniaOne-Regular.ttf',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${germaniaOne.className} antialiased`}
      >
        <AppProvider>
            <Header/>
            <main>
                {children}
            </main>
        </AppProvider>
      </body>
    </html>
  );
}
