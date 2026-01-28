import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartProviderWrapper from "@/components/CartProviderWrapper";
import { AuthProvider } from "@/context/AuthContext";
import AnnounceBar from "@/components/AnnounceBar";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

// Try to load Inter font with fallback
let inter: { className: string };
try {
  const { Inter } = require('next/font/google');
  inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
    fallback: ['system-ui', 'arial', 'sans-serif']
  });
} catch (error) {
  // Fallback if Google Fonts fails
  inter = { className: '' };
}


export const metadata: Metadata = {
  title: "Flocon - E-commerce de qualité",
  description: "Découvrez nos collections hivernales et de la Saint-Valentin",
  icons: {
    icon: [
      { url: '/logof.jpg', type: 'image/jpeg' }
    ],
    apple: [
      { url: '/logof.jpg' }
    ],
    shortcut: '/logof.jpg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logof.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logof.jpg" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <CartProviderWrapper>
            <AnnounceBar />
            <Header />
            <ClientLayoutWrapper>
              <main className="min-h-screen">{children}</main>
            </ClientLayoutWrapper>
            <Footer />
          </CartProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
