
import '../styles/footer.css';


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
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;