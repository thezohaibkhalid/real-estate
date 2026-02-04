
import Navbar from "@/components/common/Navbar";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  variable: "--font-bricolage-grotesque",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.variable} antialiased`}
      >
        <Navbar />  
        {children}
      </body>
    </html>
  );
}