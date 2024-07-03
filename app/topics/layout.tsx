import "@/styles/globals.css";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-[500px]">{children}</div>;
}
