import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Handler from "./components/Error/Handler";
import DialogPortal from "./components/DialogPortal/DialogPortal";

// views
import Home from "./views/Home/Home";

function App() {
  return (
    <main>
      <DialogPortal />
      <Handler>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Handler>
    </main>
  );
}

export default App;
