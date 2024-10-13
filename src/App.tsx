import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductListScreen from "./views/screens/ProductList/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from "./views/screens/Detail/detail";

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/about" element={<Detail />} />
                <Route path="/" element={<ProductListScreen />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
