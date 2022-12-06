import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
      <Link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}