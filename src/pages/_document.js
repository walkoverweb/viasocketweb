import { Html, Head, Main, NextScript } from "next/document";

export default function Document({ pagesData }) {
  return (
    <Html lang="en" data-theme="light">
      <Head>
        <link
          rel="stylesheet"
          href="https://interface-embed.viasocket.com/style-prod.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
