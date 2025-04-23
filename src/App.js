import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewCategory from "./component/page/NewCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/category/new`} element={<NewCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;