import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewCategory from "./component/page/NewCategory";
import NewMemo from "./component/page/NewMemo";
import UserRegist from "./component/page/UserRegist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/category/new`} element={<NewCategory />} />
        <Route path={`/memo/new`} element={<NewMemo />} />
        <Route path={`/user/new`} element={<UserRegist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;