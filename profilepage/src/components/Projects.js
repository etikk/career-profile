import classes from "./Projects.module.css";

export default function Projects() {
  return (
    <div className={classes.projects}>
      <p>Take a look at some of my sample projects:</p>
      <div>Bomberman clone</div>
      <div>Real-time forum</div>
      <div>Road intersection</div>
      <div>Profile page</div>
    </div>
  );
}
