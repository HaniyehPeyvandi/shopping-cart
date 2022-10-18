import { Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage/HomePage";
import CartProvider from "./Providers/CartProvider";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
