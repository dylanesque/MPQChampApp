Welcome to this README! If you want to try out Hall of Champions, you can find the deployed version at https://mpq-champ-app.vercel.app/

# Background:

Marvel Puzzle Quest is a tile-matching mobile game (think Candy Crush or Bejeweled) with RPG elements. For those unfamiliar with the game, the basics are summarized on [Wikipedia](https://en.wikipedia.org/wiki/Marvel_Puzzle_Quest). For the purposes of this project, I'm focusing on three specific aspects of the game:

- The option to set certain characters as "favorited", which feeds those character with "shards", an in-game currency that can be used to level a character up when you collect X shards for a character of Y rarity.

- "Champion" levels for a character, which happen by over-leveling a character with additional character covers once they've reached the standard maximum level for their specific rarity.

- The rewards that champed characters receive, specifically covers (or shards) for higher-rarity characters that certain characters receive, a mechanic known as "feeding".

# The Problem:

There are a LOT of characters in the game (currently 235), and it can be very tedious to figure out where the best application of bonuses can be, particularly in light of the fact that some characters are far more effective than others. There's too much information to reliably remember which particular characters feed others, which characters are closest to a cover as a reward, and whether or not a "fed" character is the optimal beneficiary for a bonus cover. There have been UI improvements in the game geared towards presenting more useful information about characters faster, but the central problem remains.

# The Solution:

This application will allow users to create an account, log in, and edit a database of MPQ characters to reflect their in-game lineup. To keep the app as simple as possible, the available characters will consist only of the in-game characters that give or receive covers as champion level rewards. Once those changes are saved, the user will be able to see a UI that presents them with their roster, sorted within individual rarities, that highlights the characters closest to a major cover reward of some sort.

# Technology Used And Application Flow:

**The back-end of the app will utilize**:

- [Hasura](https://hasura.io/) as the database/GraphQL ORM. I've used Hasura previously in professional projects, and I chose it here for its ease of use, flexibility, and easy integration with Auth0 and Apollo Client. 

- [Auth0](https://auth0.com/) for authentication/authorization, since it's one of the most reliable auth solutions. 
  
**The front-end will be written in**:

- [React](https://reactjs.org/), specifically the [Next.js](https://nextjs.org/) framework. Next is an attractive choice for a project like this for a number of reasons that include server-side rendering and (future) image optimization. 

- ~~[Cloudinary](https://cloudinary.com/) for asset storage and image optimization. The app currently has close to 200 image assets, and that number will increase if and when MPQ adds new feeders/feedees. Cloudinary lets optimize images for performance and saves me the trouble of having to save image assets in the codebase, which makes the application much faster.~~ **Cloudinary ended up not being a good fit for this project, more on that below**

- [Material UI]() for a component library. I also want this app to have that Material feel aesthetically, but not to the extent where it's using pure Material guidelines.

- [Emotion](https://emotion.sh/docs/introduction) for styling components: I've found that using CSS-in-JS libraries like this or [styled-components](https://styled-components.com/) significantly speeds up SPA development for me because it's quicker for me to troubleshoot and maintain scoped CSS, not to mention that it allows me to circumvent the cascade when it would have undesired effects.

- Any and all front end testing will likely be done with a mix of [react-testing-library](https://testing-library.com/docs/react-testing-library/intro), [Jest](https://jestjs.io/), and [Cypress.io](https://www.cypress.io/).


Application flow works like this:

1. A user signs up for the app, and has a basic database of the relevant characters made available to work with.
2. The user can then customize individual characters in the database via editing power and character levels to reflect the state of their in-game lineup, in an "Edit Roster" screen, and saving those changes.
3. The user can then navigate to a "Roster Status" screen, which will do several things:

   - Filter the list of characters, presenting only characters with one or more power levels added.
   - Present lists of the characters, organized into individual rarity levels and sorted to highlight the characters closest to their next in-game reward.

# Development Phases:

**Phase One:** This phase will consist of creating and configuring Hasura, Auth0, and the basic Next.js app skeleton, and getting these parts communicating and working as expected. **This phase is complete.**

**Phase Two:** This phase will consist of getting the seed database updated, plus writing, testing, and implementing all Hasura GraphQL queries and mutations. When this phase is complete, the back-end of the app will be essentially finished. While I won't be writing automated tests at this point, I will be earmarking portions of code that need to have tests written for at a later date. **This phase is completed.**

**Phase Three:** I will begin to introduce basic styling at this point, flesh out individual pages, etc. When this phase is complete, the MVP of the application will be complete, and I'll deploy the app for basic user testing. **This phase is completed.**

**Phase Four:** This phase will consist of more advanced styling and comprehensive cross-browser testing. Automated testing will begin, and I will be focusing my energy on getting the finer details of the character report page filtering and other features on that page complete. Changes based on user feedback will begin, and a data caching solution will be implemented at this point. **This phase is underway**

# Future Enhancements:

Some things for me to consider in the future after the MVP is finished:

- Adding [progressive web app](https://web.dev/what-are-pwas/) functionality.
- Creating a mobile version of the app in [React Native](https://reactnative.dev/)
- Deeper logic in the application that accounts for some cover rewards being more useful than others, some characters being more useful than others, and other (somewhat subjective) metrics.
  
# What I learned from this project:

**Don't Finalize the Data Models Without Writing Specs For Front-End Data Flow, Or Considering Back-End Quirks:**: There was a small amount of wasted effort in the character models in the form of:
- a feeder attribute which played no part in the application flow
- a convention of linking feeders/feedees via a system of character ids which turned out to be (a) unnecessary, (b) hard to reason about, and (c) formatted as the wrong type for Hasura, namely an array of integers. A minor quirk of Hasura is that it doesn't currently support arrays as a data type, only as many-to-one relationship, making them very awkward if you don't need them to be indexed, etc.
- On that note, I still needed to store feedees as an array sometimes. The solution turned out to simply to store it as a string, and have a function that splits the string into an array if necessary. This is a minor annoyance in an app like there where there's a capped number of entities in the table that need this treatment, but something to keep in mind for future work where this could result in a lot of unnecessary processing.

All of the above could have been caught sooner had I taken a more careful approach to planning, including drafting UI components using a solution like Storybook. 

**Don't rely on automated image optimizatios services to do the whole job for you**: I walked into this with the assumption that Cloudinary's in-flight image optimization would be sufficient, and that was a huge mistake. I didn't have the granularity that I wanted, and the unique filenames that Cloudinary uses made uploading new versions of an image very costly to maintain in the codebase. Cloudinary's customer support was pretty responsive, but ultimately unhelpful. In the future, I will never, ever count on a library like this to optimize images as opposed to doing everything reasonable to manually shrink image sizes using tools like [Squoosh](https://squoosh.app/), lazy-loading, stripping metadata, etc.

**Use TypeScript for any full-fledged web applications**:

- This was a minor concern for this particular project, but I've gradually come around to the time that TS saves a ;lot of pain
  via static analysis of code and catching errors faster. Having said this, I may bolster the codebase with some TS in the future.

**Vetting third-party libraries more thoroughly**

- The Auth0 library used in the application is still experimental as of the time of this writing: despite it working very well and setup with the provided boilerplate being a breeze, I prefer not to use any libraries or features that aren't fully vetted for production use (Looking at you, [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html)). I'm not going to change it, but a definite reminder to look before I leap.

**Picking input elements that do the job, but aren't the best for the job**: 

- An earlier version of this application used `<select>` elements for dropdown elements in the roster editing page, a choice that resulted in an extra 20-90K elements rendered on the page. After doing some exploring, it occurred to me that `<input>` elements of the `number` type mapped more closely to what those interfaces were trying to do, with a massive savings of rendered elements, and is easier to style as well. This change resulted in a page load that was a starkly noticeable 2+ seconds faster, and in the future, I'll be more mindful of choosing input elements that are ideal for the work they need to accomplish, instead of something that's 'good enough'. 
