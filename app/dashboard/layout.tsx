import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import FloatingWhatsappButton from "@/app/components/FloatingButtom";
import AuthGuard from "../components/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}>
      <Header />
      <div className="bg-gray-100">
      <AuthGuard> {children} </AuthGuard>
      </div>
      <Footer />
      <FloatingWhatsappButton />
    </div>
  );
}