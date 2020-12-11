import Head from 'next/head'

import { withApollo } from '../lib/withApollo';
import { useFetchUser } from '../lib/user';
import Login from '../components/Auth/Login';
import LogoutBtn from '../components/Auth/Logout';
import CharEdit from '../components/CharEditor'

const IndexPage = () => {
  // Variables
  const { user, loading } = useFetchUser();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && !user) {
    return <Login />;
  } else {
    return (
      <div className="index-background">
        <Head>
          <title>MPQ Champ App</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <h1 className="white">Welcome to the Marvel Puzzle Quest Champion Tracker!</h1>
        <CharEdit user={user.sub} />

        {user && <LogoutBtn />}
      </div>
    );
  }
};

export default withApollo()(IndexPage);
