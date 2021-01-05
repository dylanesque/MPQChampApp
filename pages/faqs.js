import Head from 'next/head';

const FAQS = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="The FAQS page for the Hall of Champions application, explaining certain choices"
        ></meta>
      </Head>
      <h2 className="page-heading">FAQS</h2>
      <div className="center-div">
        <main className="page-main">
          <h3 className="page-heading">Q: How will my data be used?</h3>
          <p>
            A: This app only requires login information, and that's all I ask. I
            will NEVER, EVER sell your data.
          </p>
          <h3 className="page-heading">Q: Hey, where are shards?</h3>
          <p>
            For now, I don't have plans to add shards, especially since I see
            "where should I put my shards?" as the main question that this
            application is answering. Having said that, I will strongly consider
            adding counts further down the road I hear a lot of requests for
            this.
          </p>
          <h3 className="page-heading">Q: What's next for the app?</h3>
          <ul>
            <li>Style & User Experience improvements</li>
            <li>Improved loading times, and other performance improvements</li>
            <li>
              More realistic behavior in the character editor that maps more
              closely to the game. For example, you'll only be allowed to select
              the levels for a character that would be available per the number
              of covers they possess.
            </li>
            <li>More detailed information in roster reports</li>
            <li>Reward Status for Five Star Characters</li>
          </ul>
        </main>
      </div>
    </>
  );
};

export default FAQS;
