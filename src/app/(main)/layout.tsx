import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
