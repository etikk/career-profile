import classes from "./Home.module.css";

export default function Home() {
  return (
    <div className={classes.home}>
      <h1>Welcome to my kood/Jõhvi profile page!</h1>
      <br></br>
      <p>This page was created as a part of the kood/Jõhvi div-01 "graphql" task.</p>
      <p>The object of the task was to make qraphql queries to the school API</p>
      <p>and present the data as fields in the profile section and two graphs.</p>
      <br></br>
      <p>
        The page uses a simple React base and the graphs are created using react-chart-js.
      </p>
    </div>
  );
}
