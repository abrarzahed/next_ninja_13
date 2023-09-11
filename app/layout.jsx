import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Dojo Helpdesk",
  description: "Covers almost everything of next.js 13",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
