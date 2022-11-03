import "../styles/navbar.css";
import { Helmet } from "react-helmet";

export default function Navbar() {
    function ham() {
        const navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("active");
        
    }
    
    return (

       
            <header>
                
                <div className="logo">
                    <img className="image" src="https://i.ibb.co/tBj00Cx/BookClub.png" alt="Book Club" width="40" height="40"></img>
                    Book<span>Club</span>
                </div>

                <div className="hamburger" onClick={ham} >
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
              

                <div className="nav-bar">
                    <input type="search" placeholder="Search" />
                    <button> Signup</button>
                    <button> Login</button>
                    <button>WishList</button>
                    <button>Cart</button>
                </div>
            </header>
        
    )
}