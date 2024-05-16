import { Header } from "./components/Header"
import { ProductsPage } from "./pages/ProductsPage"
import { ProductInfoPage } from "./pages/ProductInfoPage"
import { Basket } from "./pages/Basket"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className="h-[100vh] px-4">
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product" element={<ProductInfoPage />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  )
}

export default App
