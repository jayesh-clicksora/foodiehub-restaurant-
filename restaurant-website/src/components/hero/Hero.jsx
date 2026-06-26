// import "./Hero.css";

// function Hero() {
//   const scrollToBestSeller = () => {
//     const section = document.getElementById("best-seller-section");

//     if (section) {
//       section.scrollIntoView({
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section className="hero">
//       <div className="hero-left">
//         <h1>Fresh Food Delivered In 15 Minutes</h1>

//         <p>
//           Get groceries, snacks, beverages and meals delivered instantly at your
//           doorstep.
//         </p>

//         <button className="hero-btn" onClick={scrollToBestSeller}>
//           Order Now
//         </button>
//       </div>

//       <div className="hero-right">
//         <img
//           src="https://images.unsplash.com/photo-1542838132-92c53300491e"
//           alt="food"
//         />
//       </div>
//     </section>
//   );
// }

// export default Hero;

import "./Hero.css";

function Hero() {
  const scrollToBestSeller = () => {
    const section = document.getElementById("best-seller-section");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Fresh Food Delivered In 15 Minutes</h1>

        <p>
          Get groceries, snacks, beverages and meals delivered instantly at your
          doorstep.
        </p>

        <button className="hero-btn" onClick={scrollToBestSeller}>
          Order Now
        </button>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="food"
        />
      </div>
    </section>
  );
}

export default Hero;
