import { Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage/HomePage";
import CartProvider from "./Providers/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
  return (
    <CartProvider>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
