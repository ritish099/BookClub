import "../styles/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  console.log(process.env.PUBLIC_URL);
  function ham() {
    const navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
  }

  return (
    <header>
      {/*<div className="logo">
        <img
          className="image"
          src={process.env.PUBLIC_URL + "BookClub.png"}
          alt="Book Club"
          width="30"
          height="30"
        ></img>
        Book<span>Club</span>
  </div>*/}

      <div className="hamburger" onClick={ham}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <input className="nav-input" type="search" placeholder="Search" />

      <div className="nav-bar">
        <Link to="/signup">
          <button className="nav-btn">Signup</button>
        </Link>

        <Link to="/signin">
          <button className="nav-btn">Login</button>
        </Link>

        <button className="nav-btn">WishList</button>
        <button className="nav-btn">Cart</button>
      </div>
    </header>
  );
}
