import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import MobileNav from "./components/MobileNav/MobileNav";
import Contact from "./components/Contact/Contact";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Orders from "./pages/Orders";

// 1. SCROLL TO TOP COMPONENT YAHAN HAI
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (food) => {
    const existingItem = cart.find((item) => item.id === food.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }

    toast.success(
      <div>
        ✅ Item Added To Cart
        <Link
          to="/cart"
          style={{
            color: "#fff",
            fontWeight: "bold",
            textDecoration: "underline",
            display: "block",
            marginTop: "5px",
          }}
        >
          🛒 Go To Cart
        </Link>
      </div>,
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.error("Item Removed");
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item,
      ),
    );
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    exists
      ? setWishlist(wishlist.filter((item) => item.id !== product.id))
      : setWishlist([...wishlist, product]);
  };

  return (
    <BrowserRouter>
      <AppContent
        cart={cart}
        setCart={setCart}
        wishlist={wishlist}
        setWishlist={setWishlist}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        toggleWishlist={toggleWishlist}
      />
    </BrowserRouter>
  );
}

function AppContent({
  cart,
  setCart,
  wishlist,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  darkMode,
  setDarkMode,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleWishlist,
}) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className={darkMode ? "dark" : "light"}>
      {/* 2. SCROLL TO TOP KO YAHAN INJECT KIYA */}
      <ScrollToTop />

      {!isAdminPage && (
        <Navbar
          cartCount={cart.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              searchQuery={searchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              darkMode={darkMode}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/menu"
          element={
            <Menu
              addToCart={addToCart}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout cart={cart} setCart={setCart} darkMode={darkMode} />
          }
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/product-details"
          element={<ProductDetails darkMode={darkMode} addToCart={addToCart} />}
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route path="/orders" element={<Orders darkMode={darkMode} />} />
      </Routes>

      {!isAdminPage && <Contact />}
      {!isAdminPage && (
        <MobileNav cartCount={cart.length} darkMode={darkMode} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
