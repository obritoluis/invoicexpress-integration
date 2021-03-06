import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>InvoiceXpress upload CSV tool</title>
        <meta name="description" content="InvoiceXpress upload CSV tool" />
        <meta name="og:title" content="InvoiceXpress upload CSV tool" />
      </Head>
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}