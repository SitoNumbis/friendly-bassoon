import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/Navbar/Navbar";
import Handler from "./components/Error/Handler";
import DialogPortal from "./components/DialogPortal/DialogPortal";

// views
import Home from "./views/Home/Home";

function App() {
  return (
    <main className="p-3 flex flex-col gap-3 max-w-[1024px] m-auto entrance">
      <DialogPortal />
      <Handler>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </Handler>
    </main>
  );
}

export default App;
