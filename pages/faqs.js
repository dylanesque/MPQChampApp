const FAQS = () => {
  return (
    <>
      <h1>FAQS</h1>
      <div className="center-div">
        <main className="page-main">
          <h2>Q: How will my data be used?</h2>
          <p>
            A: This app only requires login information, and that's all I ask. I
            will NEVER, EVER sell your data.
          </p>
          <h2>Q: Hey, where are shards?</h2>
          <p>
            For now, I don't have plans to add shards, especially since I see
            "where should I put my shards?" as the main question that this
            application is answering. Having said that, I will strongly consider
            adding counts further down the road I hear a lot of requests for
            this.
          </p>
          <h2>Q: What's next for the app?</h2>
          <ul>
            <li>Style & User Experience improvements</li>
            <li>Improved loading times, and other performance improvements</li>
            <li>More realistic behavior in the character editor that maps more closely to the game. For example,
            you'll only be allowed to select the levels for a character that would be available per the number of covers they possess.</li>
          </ul>
        </main>
      </div>
    </>
  );
};

export default FAQS;
