import type { Metadata } from "next";
import { Inter, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/utils/SessionProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Sharetree",
  description: "Share your social links",
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="scroll-smooth">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${montserrat.className} h-screen`}>
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
