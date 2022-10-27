import classes from "./Cv.module.css";
import face from "../assets/Erkki_Tikk_rnd.png";

export default function Cv() {
  return (
    <div className={classes.cv}>
      <img className={classes.image} src={face} alt="Erkki Tikk" />
      <h1>Curriculum Vitae</h1>

      <h2>Contact Information</h2>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <b>Erkki Tikk</b>
            </td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>39</td>
          </tr>
          <tr>
            <td>Resides in:</td>
            <td>Tartu, Estonia</td>
          </tr>
          <tr>
            <td>e-mail:</td>
            <td>
              <a href="mailto:erkkitikk@gmail.com">erkkitikk@gmail.com</a>
            </td>
          </tr>
          <tr>
            <td>tel:</td>
            <td>+372 511 7441</td>
          </tr>
          <tr>
            <td>Linkedin:</td>
            <td>
              <a href="https://www.linkedin.com/in/erkki-tikk-1514b9221/">
                linkedin.com/in/erkki-tikk-1514b9221/
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <h2>Education</h2>
      <table>
        <tbody>
          <tr>
            <td>2021 - Present</td>
            <td>
              <b>kood/Jõhvi, Software Engineering</b>
            </td>
          </tr>
          <tr>
            <td>2003 - 2007</td>
            <td>Tallinna Tehnikakõrgkool,</td>
          </tr>
          <tr>
            <td></td>
            <td>Higher National Diploma, Applied Architecture</td>
          </tr>
          <tr>
            <td>1991 - 2002</td>
            <td>Tartu Miina Härma Gymnasium</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h2>Work Experience</h2>
      <table>
        <tbody>
          <tr>
            <td>2018 - Present</td>
            <td>Asymmetric Systems OÜ, military architect and inventor</td>
          </tr>
          <tr>
            <td>2017 - 2021</td>
            <td>Estonian Centre for Defence Investment, chief architect</td>
          </tr>
          <tr>
            <td>2010 - 2017</td>
            <td>Estonian Defence Forces, chief architect</td>
          </tr>
          <tr>
            <td>2007 - 2010</td>
            <td>Osaühing Sirkel&Mall, architect</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h2>Certifications</h2>
      <table>
        <tbody>
          <tr>
            <td>2018 - Present</td>
            <td>Asymmetric Systems OÜ, military architect and inventor</td>
          </tr>
          <tr>
            <td>2017 - 2021</td>
            <td>Estonian Centre for Defence Investment, chief architect</td>
          </tr>
          <tr>
            <td>2010 - 2017</td>
            <td>Estonian Defence Forces, chief architect</td>
          </tr>
          <tr>
            <td>2007 - 2010</td>
            <td>Osaühing Sirkel&Mall, architect</td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  );
}
