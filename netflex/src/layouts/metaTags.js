import Head from "next/head";

export default function MetaTags({ currentURL }) {
  return (
    <Head>
      <title>NETFLEX</title>
      <meta property="og:title" content="Netflex" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentURL} />
      <meta property="og:image" content="/netflix.svg" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#282f4d" />
      <meta
        property="og:description"
        content="Netflex is a movies web for you, you can search any movie here and see details about the movie that you looking for"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="/netflix.svg" />
      <meta
        name="description"
        content="Netflex is a movies web for you, you can search any movie here and see details about the movie that you looking for"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link rel="canonical" href={currentURL} />
    </Head>
  );
}
