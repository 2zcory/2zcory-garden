import { ThemeProvider } from "@/components/theme-provider";
import { getSiteMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata = getSiteMetadata();

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
