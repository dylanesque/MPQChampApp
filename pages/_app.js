import Head from 'next/head';

import '../styles/main.css'
import '../styles/normalize.css'
import '../styles/App.css';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
