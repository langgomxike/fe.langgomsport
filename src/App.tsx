import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductListScreen from "./views/screens/ProductList/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from "./views/screens/Detail/detail";
import ScreenNameConfig from "./configs/ScreenNameConfig";
import Home from "./views/screens/Home/home";
import Cart from "./views/screens/Cart/cart";
import AppContext from "./configs/AppContext";
import {useContext} from "react";

function App() {
  return (
    <AppContext>
      <Router>
        <Routes>
          <Route path={ScreenNameConfig.HOME} element={<Home />} />
          <Route path={ScreenNameConfig.PRODUCTS} element={<ProductListScreen />}/>
          <Route path={ScreenNameConfig.DETAIL} element={<Detail />} />
          <Route path={ScreenNameConfig.CART} element={<Cart />} />
        </Routes>
      </Router>
    </AppContext>
  );
}

export default App;
