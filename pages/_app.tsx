import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return  (
  <ThemeProvider defaultTheme='light' attribute="class">
  <>
  <Navbar/>
  <Component {...pageProps} />
  </>
  </ThemeProvider>
  )
}
