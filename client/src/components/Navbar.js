import "../styles/navBar.css";
export default function Navbar() {
    return (
        <div>
            <header>
                <div class="logo">
                    Book<span>Hub</span>
                </div>

                <div class="hamburger">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <div class="nav-bar">
                    <input type="search" placeholder="Search">
                        <button> Signup</button>
                        <button> Login</button>
                        <button>WishList</button>
                        <button>Cart</button>
                </div>
            </header>

            <script>
                ham=document.querySelector(".hamburger");
                ham.onclick=function(){
                    console.log("Clicked");
                navBar=document.querySelector(".nav-bar");
                navBar.classList.toggle("active");
               }
            </script>

        <div />
            )
}