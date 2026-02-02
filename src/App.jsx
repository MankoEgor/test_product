import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Prices from "./pages/Prices.jsx";
import Services from "./pages/Services.jsx";
import Contacts from "./pages/Contacts.jsx";
import Other from "./pages/Other.jsx";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/prices" element={<Prices />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/other" element={<Other />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;