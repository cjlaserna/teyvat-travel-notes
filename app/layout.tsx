import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

const gFont = localFont({ src: "./assets/ja-jp.ttf" });

export const metadata: Metadata = {
  title: "Teyvat Travel Notes",
  description:
    "Maximize your adventure in Teyvat with Teyvat Travel Notes, the essential Genshin Impact to-do list. Discover daily tasks, track character progress, and conquer domains with our comprehensive guide to ensure you're always one step ahead in this fantastical world. Embark on your journey with precision and efficiency - Teyvat awaits!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={gFont.className}>
        <main className="flex items-center justify-center flex-col w-screen h-screen p-5 bg-transparent">
          {children}
        </main>
      </body>
    </html>
  );
}
