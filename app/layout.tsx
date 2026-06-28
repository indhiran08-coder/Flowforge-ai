import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "FlowForge AI — Visual Workflow Automation", template: "%s | FlowForge AI" },
  description: "Build AI-powered automations without code. Connect apps, chain AI models, loop over data, and run it all in real time.",
  keywords: ["workflow automation", "AI workflows", "no-code automation", "n8n alternative", "zapier alternative"],
  openGraph: {
    type: "website",
    siteName: "FlowForge AI",
    title: "FlowForge AI — Visual Workflow Automation",
    description: "Build AI-powered automations without code.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={inter.variable}>
        <body className="font-sans antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}