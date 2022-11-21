import '../styles/footer.css';
import {BsFacebook, BsTwitter, BsLinkedin} from "react-icons/bs";
import {AiFillInstagram} from "react-icons/ai";


const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="rowBig">
          <div className="footerCol left_f">
            <h4 className="leftH">get help</h4>
            <ul>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Order status</a></li>
              <li><a href="#">our services</a></li>
              <li><a href="#">Returns and Cancellations</a></li>
            </ul>
          </div>
          <div className="footerCol right_f">
            <h4 className="rightH">follow us</h4>
            <div className="social-links">
              <a href="#"><BsFacebook className="icon"></BsFacebook></a>
              <a href="#"><AiFillInstagram className="icon"></AiFillInstagram></a>
              <a href="#"><BsTwitter className="icon"></BsTwitter></a>
              <a href="#"><BsLinkedin className="icon"></BsLinkedin></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
