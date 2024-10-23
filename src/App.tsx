import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductListScreen from "./views/screens/ProductList/index";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from "./views/screens/Detail/detail";
import ScreenNameConfig from "./configs/ScreenNameConfig";
=======
import ProductDetail from "./views/screens/ProductDetail/productDetail";
>>>>>>> 7dcd0f6 (temp code)

function App() {
  return (
    <>
<<<<<<< HEAD
      <Router>
        <Routes>
          <Route path={ScreenNameConfig.HOME} element={<ProductListScreen />} />
          <Route path={ScreenNameConfig.DETAIL} element={<Detail />} />
        </Routes>
      </Router>
=======
        {/* <ProductListScreen /> */}
        <ProductDetail></ProductDetail>

>>>>>>> 7dcd0f6 (temp code)
    </>
  );
}

export default App;
