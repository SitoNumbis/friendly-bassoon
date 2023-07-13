import { BrowserRouter, Routes, Route } from "react-router-dom";

import { css } from "@emotion/css";

// components
import Navbar from "./components/Navbar/Navbar";
import Handler from "./components/Error/Handler";
import DialogPortal from "./components/DialogPortal/DialogPortal";

// views
import Home from "./views/Home/Home";

// images
import bg from "./assets/images/BG.jpg";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.body.style.background = `url('${bg}')`;
    /* document.body.style.backgroundColor = "#8BC6EC";
    document.body.style.backgroundImage =
      "linear-gradient(135deg, #8BC6EC 0%, #676aea 100%)"; */
  }, []);

  return (
    <main
      className={`p-3 flex flex-col gap-3 max-w-[1024px] m-auto entrance rounded-3xl backdrop-blur-xl ${css(
        { background: "#80808030" }
      )}`}
    >
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
