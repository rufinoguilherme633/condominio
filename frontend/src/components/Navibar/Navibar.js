import { Link, Navigate } from "react-router-dom";
import style from "./Navibar.module.css";
import { use, useState } from "react";
import {
  FontAwesomeIcon,
  faArrowRightFromBracket,
  faUser,
} from "../../icons/index";

import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
export default function Navibar() {
  const navigate = useNavigate();

  const links = [
    { to: "/casa/", page: "Casa" },
    { to: "/morador", page: "Morador" },

  ];



  return (
    <>
      <nav className={style.navbar}>


        <ul className={style.menuList}>
          {links.map((link) => (
            <li key={link.to} className={style.menu_item}>
              <Link to={link.to} className={style.menu_link}>
                {link.page}
              </Link>
            </li>
          ))}
        </ul>


      </nav>

    </>
  );
}