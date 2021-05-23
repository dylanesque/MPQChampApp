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
            <strong>A:</strong> This app only requires login information, and
            that's all I ask. I will NEVER, EVER sell your data.
          </p>

          <h3 className="page-heading">
            Q: Can I have duplicate characters in my database?
          </h3>
          <p>
            <strong>A:</strong> Duplicates have the problem here of both a)
            taking up (relatively limited) database space, and b) not being a
            consideration when it comes to feeding and rewards, so there are
            currently no plans to change functionality to add feeders to the
            application.
          </p>

          <h3 className="page-heading">Q: What's next for the app?</h3>
          <ul>
            <li>
              Improvements to styling and other aspects of user experience
            </li>
            <li>More detailed information in roster reports</li>
          </ul>
        </main>
      </div>
    </>
  );
};

export default FAQS;
