import { BrowserRouter, Route, Routes } from "react-router-dom";
import Map from "./features/map/Map";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/map" element={<Map />} />
        {/* <Route path="/map/:country" element={<h1>hello</h1>} /> */}
      </Routes> 
    </BrowserRouter>
  );
}
