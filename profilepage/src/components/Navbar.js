// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import {Fragment} from "react";

import classes from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={classes.navbar}>
      <nav className={classes.pages}>
        <ul>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgb(220, 249, 0)" : "white",
              })}
              to="/"
              end
            >
              erkki.tikk@kood/Jõhvi
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgb(220, 249, 0)" : "white",
              })}
              to="/cv"
            >
              CV
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgb(220, 249, 0)" : "white",
              })}
              to="/projects"
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgb(220, 249, 0)" : "white",
              })}
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgb(220, 249, 0)" : "white",
              })}
              to="/barchart"
            >
              Div-01 tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgb(220, 249, 0)" : "white",
              })}
              to="/linechart"
            >
              Levels by type
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
