import classes from "./Home.module.css";
import face from "../assets/Erkki_Tikk_rnd.png";

export default function Home() {
  return (
    <div className={classes.home}>
      <img className={classes.image} src={face} alt="Erkki Tikk" />
      <h1>Welcome to my kood/Jõhvi profile page!</h1>
      <p>
        My name is <b>Erkki Tikk</b> and I am a former military architect, re-profiling my
        career into <b>software engineering</b>.
        <br />
        <br />
        In the summer of 2021 I applied to and got accepted into the kood/Jõhvi edu-01
        program and I haven't looked back since! What excites me in software engineering
        is being at the forefront of modern technologies and all the puzzles I get to
        solve in the process. I also enjoy learning new skills and value skill development
        opportunities the most in a workplace.
      </p>
      <p>
        I would greatly appreciate an opportunity to work with you and your team and build
        your business together!
        <br />
        Please take a look at my sample projects and CV and feel free to contact me
        anytime.
      </p>
      <br />
      <br />
    </div>
  );
}
