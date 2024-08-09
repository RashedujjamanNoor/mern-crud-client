import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from "./components/users/Users";
import Update from "./components/update/Update";
import Create from "./components/create/Create";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
