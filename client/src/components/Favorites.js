import ProductCard from './ProductCard';
import '../styles/Products.css';

const Favorites = () => {
    return (
      <div className="BigDiv">
        <div className="Heading">
          <h1>Your Favorites</h1>
        </div>

        <div className="Catalogue">
          <ProductCard name="AB" price="100$" user="sd" />
          <ProductCard name="AB" price="100$" user="sd" />
          <ProductCard name="AB" price="100$" user="sd" />
          <ProductCard name="AB" price="100$" user="sd" />
          <ProductCard name="AB" price="100$" user="sd" />
          <ProductCard name="AB" price="100$" user="sd" />
          <ProductCard name="AB" price="100$" user="sd" />
          <ProductCard name="AB" price="100$" user="sd" />
        </div>
      </div>
    );
}

export default Favorites;