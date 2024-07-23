import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/utils/SessionProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sharetree",
  description: "Share your social links",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={'h-screen'}>
        <AuthProvider>
            {children}
        </AuthProvider>
        <Toaster
          position="top-center"
        />
      </body>
    </html>
  );
}
