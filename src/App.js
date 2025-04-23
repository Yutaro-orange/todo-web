import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewCategory from "./component/page/NewCategory";
import NewMemo from "./component/page/NewMemo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/category/new`} element={<NewCategory />} />
        <Route path={`/memo/new`} element={<NewMemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;