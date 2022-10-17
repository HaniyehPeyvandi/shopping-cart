import { Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/" element={<HomePage/>} />
    </Routes>
  );
}

export default App;
