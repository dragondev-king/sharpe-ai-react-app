import { Routes, Route } from "react-router-dom";

import Taurus from "./Routes/Taurus";
import Phantom from './Routes/Phantom';
import Helios from "./Routes/Helios";
import Vela from "./Routes/Vela";
import Centauri from "./Routes/Centauri";

const Stratigies = () => {
  return (
    <Routes>
      <Route path="/taurus" element={<Taurus />} />
      <Route path="/phantom" element={<Phantom />} />
      <Route path="/helios" element={<Helios />} />
      <Route path="/vela" element={<Vela />} />
      <Route path="/centauri" element={<Centauri />} />
      <Route path="*" element={<Taurus />} />
    </Routes>
  );
};

export default Stratigies;
