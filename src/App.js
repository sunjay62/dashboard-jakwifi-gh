import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Addclient from "./components/addclient/Addclient";
import Hsprofile from "./components/hsprofile/Hsprofile";
import Products from "./components/products/Products";
import Datatable from "./components/datatable/Datatable";
import Myservice from "./components/myservice/Myservice";
import Site from "./components/site/Site";
import Leafletmap from "./components/leafletmap/Leafletmap";
import Detectobject from "./components/detectobject/Detectobject";
import View from "./components/view/View";
import "./style/dark.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="/reseller/new" element={<Addclient />} />
            <Route path="/hotspot/profile" element={<Hsprofile />} />
            <Route path="/products/new" element={<Products />} />
            <Route path="/reseller/list" element={<Datatable />} />
            <Route path="/service" element={<Myservice />} />
            <Route path="/site" element={<Site />} />
            <Route path="/site/map" element={<Leafletmap />} />
            <Route path="/verification" element={<Detectobject />} />
            <Route path="/view/:id" element={<View />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
