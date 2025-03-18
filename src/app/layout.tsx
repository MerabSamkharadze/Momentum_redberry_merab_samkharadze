import type { Metadata } from "next";
import { Fira_Sans, Fredoka } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { EmployeeProvider } from "@/context/EmployeeContext";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Momentum",
  description: "Momentum is a task management application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <EmployeeProvider>
        <body
          className={`${firaSans.variable} ${fredoka.variable} antialiased`}
        >
          <Header />
          {children}
        </body>
      </EmployeeProvider>
    </html>
  );
}
