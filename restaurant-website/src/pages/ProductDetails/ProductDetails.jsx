import "./ProductDetails.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // 👈 useNavigate इम्पोर्ट किया

function ProductDetails({ darkMode, addToCart }) {
  const location = useLocation();
  const navigate = useNavigate(); // 👈 navigate हुक इनिशियलाइज़ किया
  const [quantity, setQuantity] = useState(1);

  const defaultProduct = {
    id: 1,
    name: "Cheese Pizza",
    price: 299,
    rating: "4.5",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop",
    desc: "Fresh and delicious cheese pizza prepared with premium quality ingredients and loaded with extra cheese for better taste.",
  };

  const product = location.state?.product || defaultProduct;

  // 🛒 जब यूजर "Add To Cart" बटन दबाए
  const handleAddToCart = () => {
    // प्रोडक्ट के डेटा के साथ चुनी हुई क्वांटिटी (quantity) को भी कार्ट में भेजेंगे
    const productWithQty = { ...product, quantity };
    addToCart(productWithQty);
  };

  // ⚡ जब यूजर "Buy Now" बटन दबाए
  const handleBuyNow = () => {
    // 1. पहले प्रोडक्ट को सही क्वांटिटी के साथ कार्ट में ऐड करेंगे
    const productWithQty = { ...product, quantity };
    addToCart(productWithQty);

    // 2. फिर यूजर को सीधे चेकआउट पेज पर भेज देंगे
    navigate("/checkout");
  };

  return (
    <div className={`product-details ${darkMode ? "dark" : "light"}`}>
      {/* LEFT - PRODUCT IMAGE */}
      <div className="details-left">
        {/* 👈 अब यहाँ स्टेटिक इमेज नहीं, बल्कि क्लिक किए गए प्रोडक्ट की इमेज दिखेगी */}
        <img src={product.image} alt={product.name} />
      </div>

      {/* RIGHT - PRODUCT INFO */}
      <div className="details-right">
        {/* 👈 अब यहाँ डायनामिक नाम दिखेगा */}
        <h1>{product.name}</h1>

        {/* RATING */}
        <div className="details-rating">⭐ {product.rating}</div>

        {/* PRICE */}
        <h2>₹{product.price}</h2>

        {/* DESCRIPTION */}
        <p>
          {product.desc ||
            `Fresh and delicious ${product.name.toLowerCase()} prepared with high quality ingredients.`}
        </p>

        {/* QUANTITY CONTROLLER */}
        <div className="quantity-box">
          <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
            -
          </button>

          <span>{quantity}</span>

          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        {/* BUTTONS */}
        <div className="details-buttons">
          {/* 👈 यहाँ फंक्शन अटैच कर दिया जो आइटम को कार्ट में जोड़ देगा */}
          <button className="cart-btn" onClick={handleAddToCart}>
            Add To Cart
          </button>

          {/* 👈 यहाँ alert हटाकर handleBuyNow फंक्शन लगा दिया है */}
          <button className="buy-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
