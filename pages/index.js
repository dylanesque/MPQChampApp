import Head from 'next/head';

import { withApollo } from '../lib/withApollo';
import { useFetchUser } from '../lib/user';
import Login from '../components/Auth/Login';
import LogoutBtn from '../components/Auth/Logout';
import CharEdit from '../components/CharEditor';

const IndexPage = () => {
  const { user, loading, error } = useFetchUser();
  if (user && typeof window !== 'undefined') {
    sessionStorage.setItem('userKey', user.sub);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) return `Error! ${error}`;

  if (!loading && !user) {
    return <Login />;
  } else {
    return (
      <div className="index-background">
        <Head>
          <meta
            name="description"
            content="The main page for the MPQ Hall of Champions application, where users can edit and view their roster of characters"
          ></meta>
        </Head>
        <h1 style={{ textAlign: 'center' }}>
          Welcome to MPQ Hall of Champions!
        </h1>
        <CharEdit user={user.sub} />
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
