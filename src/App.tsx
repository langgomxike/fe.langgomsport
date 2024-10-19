import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductListScreen from "./views/screens/ProductList/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from "./views/screens/Detail/detail";
import ScreenNameConfig from "./configs/ScreenNameConfig";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={ScreenNameConfig.HOME} element={<ProductListScreen />} />
          <Route path={ScreenNameConfig.DETAIL} element={<Detail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
