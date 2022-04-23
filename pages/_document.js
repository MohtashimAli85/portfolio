import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="dark:bg-baltic-sea">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
