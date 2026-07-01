import "./FoodCard.css";
import { useNavigate } from "react-router-dom";

function FoodCard({ food, addToCart }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/auth");
      return;
    }

    addToCart(food);
  };

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} />

      <h2>{food.name}</h2>

      <p>{food.price}</p>

      <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
}

export default FoodCard;
