import classes from "./Projects.module.css";

export default function Projects() {
  return (
    <div className={classes.projects}>
      <p>Take a look at some of my sample projects:</p>
      <div>
        <h1>Bomberman clone</h1>
        <a href="https://tikk-bomberman.netlify.app/src/">Link to hosted project</a>
        <br />
        <a href="https://github.com/etikk/career-profile/tree/main/bomberman">
          Link to GitHub repository
        </a>
        <h3>Description</h3>
        <p>
          This game was created for the kood/Jõhvi div-01 task "make-your-game". The aim
          of the task was to create a clone of a classic, with Javascript and CSS and
          without using the canvas object or any external packages. The task focused on
          DOM manipulation, using RequestAnimationFrame and maintaining a steady 60fps at
          all times. To get a steady playing experience on different monitors, frame
          throttling was added. The aim of the game is to move around and blow up enemies
          with bombs. The game is played with the arrow keys and the spacebar. The game
          must be able to be stopped and started again without significant frame drops.
          The most difficult part was writing collision detection and smooth movement
          around corners. For smooth animation, a sprite image containing all different
          movements is moved with CSS under a virtual hole in the given layer.{" "}
        </p>
        <p>Tech stack: Vanilla JS, CSS</p>
      </div>
      <div>
        <h1>Real-time forum</h1>
        {/* <a href="https://tikk-bomberman.netlify.app/src/">Link to hosted project</a>
        <br /> */}
        <a href="https://tikk-bomberman.netlify.app/src/">Link to GitHub repository</a>
        <h3>Description</h3>
        <p>
          This game was created for the kood/Jõhvi div-01 task "make-your-game". The aim
          of the task was to create a clone of a classic, with Javascript and CSS and
          without using the canvas object or any external packages. The task focused on
          DOM manipulation, using RequestAnimationFrame and maintaining a steady 60fps at
          all times. To get a steady playing experience on different monitors, frame
          throttling was added. The aim of the game is to move around and blow up enemies
          with bombs. The game is played with the arrow keys and the spacebar. The game
          must be able to be stopped and started again without significant frame drops.
          The most difficult part was writing collision detection and smooth movement
          around corners. For smooth animation, a sprite image containing all different
          movements is moved with CSS under a virtual hole in the given layer.{" "}
        </p>
        <p>Tech stack: Vanilla JS, CSS</p>
      </div>
      <div>
        <h1>Road intersection</h1>
        {/* <a href="https://tikk-bomberman.netlify.app/src/">Link to hosted project</a>
        <br /> */}
        <a href="https://tikk-bomberman.netlify.app/src/">Link to GitHub repository</a>
        <h3>Description</h3>
        <p>
          This game was created for the kood/Jõhvi div-01 task "make-your-game". The aim
          of the task was to create a clone of a classic, with Javascript and CSS and
          without using the canvas object or any external packages. The task focused on
          DOM manipulation, using RequestAnimationFrame and maintaining a steady 60fps at
          all times. To get a steady playing experience on different monitors, frame
          throttling was added. The aim of the game is to move around and blow up enemies
          with bombs. The game is played with the arrow keys and the spacebar. The game
          must be able to be stopped and started again without significant frame drops.
          The most difficult part was writing collision detection and smooth movement
          around corners. For smooth animation, a sprite image containing all different
          movements is moved with CSS under a virtual hole in the given layer.{" "}
        </p>
        <p>Tech stack: Vanilla JS, CSS</p>
      </div>
      <div>
        <h1>Profile page</h1>
        <a href="https://tikk-profile.netlify.app/">Link to hosted project</a>
        <br />
        <a href="https://github.com/etikk/career-profile/tree/main/profilepage">
          Link to GitHub repository
        </a>
        <h3>Description</h3>
        <p>
          This sample project is the very same profile-page that you are currently
          visiting. We had a kood/Jõhvi div-01 task called "graphql" that was composed of
          making graphql queries into the school server API and presenting the data on a
          profile page. The graphs and data in the sections "Profile", "Div-01 tasks" and
          "Levels by type" represent this task and are making the respected queries. I
          decided to build upon this project and turn this into my actual developer
          profile page that you are currently visiting. The page has a simple React
          structure with most data hardcoded into html. The interactive graphs were made
          with react-chart-js.{" "}
        </p>
        <p>Tech stack: JS, React, CSS, Graphql, react-chart-js</p>
      </div>
      <br />
      <br />
    </div>
  );
}
