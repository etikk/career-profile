import { Link } from "react-router-dom";
// import {Fragment} from "react";

import classes from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={classes.navbar}>
      <nav className={classes.pages}>
        <ul>
          <li>
            <Link to="/">erkki.tikk@kood/Jõhvi</Link>
          </li>
          <li>
            <Link to="/cv">CV</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/barchart">Div-01 tasks</Link>
          </li>
          <li>
            <Link to="/linechart">Levels by type</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
