// import "./Promo.css";

// function Promo() {
//   return (
//     <section className="promo">

//       {/* LEFT BIG CARD */}

//       <div className="promo-left">

//         <div className="promo-content">

//           <h2>
//             Get 50% OFF
//           </h2>

//           <p>
//             On your first food order
//           </p>

//           <button>
//             Order Now
//           </button>

//         </div>

//       </div>

//       {/* RIGHT CARDS */}

//       <div className="promo-right">

//         <div className="small-card card1">

//           <h3>Free Delivery</h3>

//           <p>On orders above ₹499</p>

//         </div>

//         <div className="small-card card2">

//           <h3>Fresh Vegetables</h3>

//           <p>Delivered in 15 mins</p>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default Promo;

import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      {/* LEFT BIG CARD */}
      <div className="promo-left">
        <div className="promo-content">
          <h2>Get 50% OFF</h2>
          <p>On your first food order</p>

          {/* Yahan 'a' tag lagaya hai taaki scroll ho sake */}
          <a href="#best-seller-section" className="order-link">
            <button>Order Now</button>
          </a>
        </div>
      </div>

      {/* RIGHT CARDS */}
      <div className="promo-right">
        <div className="small-card card1">
          <h3>Free Delivery</h3>
          <p>On orders above ₹499</p>
        </div>
        <div className="small-card card2">
          <h3>Fresh Vegetables</h3>
          <p>Delivered in 15 mins</p>
        </div>
      </div>
    </section>
  );
}

export default Promo;
