import '../styles/globals.css'
import 'katex/dist/katex.min.css'
import { ThemeProvider } from 'components/theme-provider'
import { Header } from '../components/Header'
import { ModeToggle } from 'components/theme-toggle'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
      <head>
        <title>Contentlayer Next.js Example</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body>
        <Header />
        <div className="px-6">{children}</div>
        <div className="fixed bottom-2 right-2">
        <ModeToggle/>
        </div>
      </body>
      </ThemeProvider>
    </html>
  )
}
