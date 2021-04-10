import Head from "next/head";

export default function MetaTags({ currentURL }) {
  return (
    <Head>
      <title>Pokedex By Fajrin</title>
      <meta property="og:title" content="React Movie App" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentURL} />
      <meta property="og:image" content="/pokeball.svg" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#282f4d" />
      <meta
        property="og:description"
        content="Pokedex by Fajrin is pokemon deck web that u can catch your pokemon and collect them, also you can get details about other pokemons."
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="180x180" href="/pokeball.png" />
      <link rel="shortcut icon" href="/pokeball.svg" />
      <meta
        name="description"
        content="Pokedex by Fajrin is pokemon deck web that u can catch your pokemon and collect them, also you can get details about other pokemons."
      />
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=DM+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="canonical" href={currentURL} />
      <link rel="amphtml" href={`${currentURL}?amp=1`} />
    </Head>
  );
}
