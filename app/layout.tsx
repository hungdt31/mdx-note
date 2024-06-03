import "../styles/globals.css";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "components/theme-provider";
import { Header } from "../components/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <head>
          <title>MDX</title>
          <link rel="icon" href="/images/favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        </head>
        <body>
          <Header />
          <div className="px-6">{children}</div>
        </body>
      </ThemeProvider>
    </html>
  );
}
