// import { Link } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
// import {Fragment} from "react";
import logo from "../assets/KOOD_Logo_RGB-06.png";

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
        <div className={classes.logo}>
          <a href="https://kood.tech/">
            <img src={logo} alt="kood/Jõhvi logo" />
          </a>
        </div>
      </nav>
    </div>
  );
}
