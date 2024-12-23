import { MovieProvider } from '@/app/context/MovieContext';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from './context/UserContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Play AI Recommendation with MovieLens",
  description: "Play AI Recommendation with MovieLens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <MovieProvider>
            {children}
          </MovieProvider>
        </UserProvider>
      </body>
    </html>
  );
}
