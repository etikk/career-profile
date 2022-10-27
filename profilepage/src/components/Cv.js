import classes from "./Cv.module.css";
import face from "../assets/Erkki_Tikk_rnd.png";

export default function Cv() {
  return (
    <div className={classes.cv}>
      <p>Welcome to my CV!</p>
      <img className={classes.image} src={face} alt="Erkki Tikk" />
    </div>
  );
}
