import { useState } from "react";

import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import BestSeller from "../components/BestSeller/BestSeller";
import Promo from "../components/Promo/Promo";

function Home({ wishlist, toggleWishlist, addToCart, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div>
      <Hero />

      <Categories onSelectCategory={setSelectedCategory} />

      <BestSeller
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />

      <Promo />
    </div>
  );
}

export default Home;
