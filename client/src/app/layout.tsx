import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const ProviderWrapper = dynamic(() => import("../lib/ProviderWrapper"));

export const metadata: Metadata = {
  title: "Campus Hub",
  description:
    "A CMS for managing campus events and activities including registration and ticketing.",
};

const RootLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
