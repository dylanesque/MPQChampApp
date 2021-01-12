import Head from 'next/head';
import { withApollo } from '../lib/withApollo';

import { useFetchUser } from '../lib/user';
import Login from '../components/Auth/Login';
import LogoutBtn from '../components/Auth/Logout';
import CharEdit from '../components/CharEditor';

const IndexPage = () => {
  // Variables
  const { user, loading } = useFetchUser();
  if (user && typeof window !== 'undefined') {
    localStorage.setItem('userKey', user.sub);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && !user) {
    return <Login />;
  } else {
    return (
      <div className="index-background">
        <Head>
          <title>MPQ Hall Of Champions</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="The main page for the MPQ Hall of Champions application, where users can edit and view their roster of characters"
          ></meta>
        </Head>
        <h1 style={{ textAlign: 'center' }}>
          Welcome to MPQ Hall of Champions!
        </h1>
        {/* <CharEdit user={user.sub} /> */}
        <main className="loading-page">
          <h2 style={{ textAlign: 'center', padding: '1rem'}}>
            The site is currently down for back-end maintenance. We'll be back
            soon!
          </h2>
        </main>
        {user && <LogoutBtn />}
        <footer>
          All code on this site (except where noted otherwise) is ©
          {new Date().getFullYear()} Michael S. Caveney. Marvel Puzzle Quest is
          developed by Demiurge Studios.
        </footer>
      </div>
    );
  }
};

export default withApollo()(IndexPage);
