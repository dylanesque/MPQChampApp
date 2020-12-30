const About = () => {
  return (
    <>
      <h2 className="page-heading">About MPQ Champ App</h2>
      <main className="page-main">
        <h3 className="page-heading">Why Did I Create This?</h3>
        <p>
          I've been playing Marvel Puzzle Quest for a few years now (Day 2148 as
          of this writing...), and I love building and utilizing a roster of my
          favorite Marvel heroes and villains. One minor frustration I
          experience with endgame play is the redundant work of figuring out who
          to flag as bonus heroes for the most efficient application of shards.
          That's why I created MPQ Champ App to automate this task!
        </p>
        <h3 className="page-heading">How It Works</h3>
        <p>
          Users of the time-honored{' '}
          <a href="https://mpq.gamependium.com/">MPQ Gamependium</a> utility will notice a similar feel to this application.
          When you create an account, the application will create a seed database for you that consists of all characters that 
          give or receive covers from other characters as champion rewards. You simply edit that database to match your in-game lineup, and 
          you can view an instant report showing you who's closest to major rewards (read: covers, shards, or significant amounts of Command Points!
        </p>
      </main>
    </>
  );
};

export default About;
