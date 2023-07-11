import { BrowserRouter, Routes, Route } from "react-router-dom";

// views
import Home from "./views/Home/Home";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
