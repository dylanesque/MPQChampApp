import 'bootstrap/dist/css/bootstrap.min.css';
import '@reach/tabs/styles.css';

import '../styles/main.css'
import '../styles/normalize.css'
import '../styles/App.css';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
