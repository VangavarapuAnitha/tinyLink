import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import RedirectHandler from "./pages/RedirectHandler/RedirectHandler";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<Stats />} />
          <Route path="/:code" element={<RedirectHandler />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
