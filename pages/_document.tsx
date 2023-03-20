import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system. "
          />

          <meta name="keywords" content="Toi&Moi social-media friend post" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system."
          />
          <meta name="theme-color" content="#eb7f82" />
          <meta property="fb:app_id" content="4937468222991458" />
          <meta property="og:title" content="Toi & Moi | Brand New Social Media Platform" />
          <meta property="og:url" content="https://toi-moi.herokuapp.com" />
          <meta
            property="og:image"
            content="https://cdn01.pinkoi.com/product/ZD5QQsTg/0/800x0.jpg"
          />

          {/* new */}

          <meta property="fb:app_id" content="4937468222991458" />
          <meta
            property="og:title"
            content="O.HI.O | 亞洲領先設計購物網站 | Design the way you are"
          />
          <meta property="og:url" content="https://www.pinkoi.com/browse" />
          <meta
            property="og:image"
            content="https://cdn01.pinkoi.com/product/ZD5QQsTg/0/800x0.jpg"
          />

          {/* <!-- iOS  --> */}
          <link href="logo.svg" rel="apple-touch-icon" />
          <link href="logo.svg" rel="apple-touch-icon" sizes="76x76" />
          <link href="logo.svg" rel="apple-touch-icon" sizes="120x120" />
          <link href="logo.svg" rel="apple-touch-icon" sizes="152x152" />

          <link rel="apple-touch-icon" href="./favicon.ico" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <link rel="apple-touch-icon" href="../public/favicon.ico" />
          <link rel="icon" href="../public/favicon.ico" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
