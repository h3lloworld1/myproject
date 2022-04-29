import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import meals from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ME MIKVARS ELA</h1>
        <HeaderCartButton onClick={props.onClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="not found" />
      </div>
    </Fragment>
  );
};

export default Header;
