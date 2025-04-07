import "./globals.css"; 
import Navbar from "@/app/components/Navbar"; 

export const metadata = {
  title: "Job Portal",
  description: "AI-powered job finder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
