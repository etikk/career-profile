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
            <td>E-mail:</td>
            <td>
              <a href="mailto:erkkitikk@gmail.com">erkkitikk@gmail.com</a>
            </td>
          </tr>
          <tr>
            <td>Tel:</td>
            <td>+372 511 7441</td>
          </tr>
          <tr>
            <td>Discord:</td>
            <td>Erkki Tikk#8188</td>
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

      <h2>Certifications and training</h2>
      <table>
        <tbody>
          <tr>
            <td>Tech stack</td>
            <td>JS, TS, React, Sqlite, Go, Rust</td>
          </tr>
          <tr>
            <td>Other programs</td>
            <td>Autodesk: AutoCad, Revit, Inventor; Photoshop, Illustrator</td>
          </tr>
          <tr>
            <td>2022</td>
            <td>Awarded military rank: Second Liutenant (OF-1)</td>
          </tr>
          <tr>
            <td>2021 - Present</td>
            <td>Active member of Estonian Defence League</td>
          </tr>
          <tr>
            <td>2010 - 2021</td>
            <td>EST / NATO / EU Secret level information certified </td>
          </tr>
          <tr>
            <td>2018</td>
            <td>Garage48 Defence Makeathon prototyping team leader</td>
          </tr>
          <tr>
            <td>2017</td>
            <td>Concealed carry gun permit</td>
          </tr>
          <tr>
            <td>2014</td>
            <td>EDF security officers training</td>
          </tr>
          <tr>
            <td>2011</td>
            <td>EDF reserve officers training, ensign (OF D)</td>
          </tr>
          <tr>
            <td>2002 - 2003</td>
            <td>Estonian Defence Forces, conscript service</td>
          </tr>
          <tr>
            <td></td>
            <td>Kuperjanov battalion, 120 mm mortar battery surveyor, corporal (OR 2)</td>
          </tr>
          <tr>
            <td>2001</td>
            <td>B-category driver's licence</td>
          </tr>
          <tr>
            <td>2000</td>
            <td>PADI Open Water Diver licence</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h2>Additional info</h2>
      <table>
        <tbody>
          <tr>
            <td>Interests</td>
            <td>astrophysics, quantum physics, AI, computer tehnology, robotics,</td>
          </tr>
          <tr>
            <td></td>
            <td>military technology, tanks, firearms, foreign politics</td>
          </tr>
          <tr>
            <td>Hobbies</td>
            <td>Dungeons&Dragons, airsoft, pc gaming, inventing</td>
          </tr>
          <tr>
            <td>Languages</td>
            <td>Estonian, English, German</td>
          </tr>
          <tr>
            <td>Other</td>
            <td>Married, two daughters</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
    </div>
  );
}
