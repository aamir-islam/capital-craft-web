import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Sidebar from "./routes/Sidebar";
import { HomePage } from "./component/HomePage/HomePage";
import { ProfilePage } from "./component/ProfilePage/ProfilePage";
import { PositionPage } from "./component/PositionPage/PositionPage";
import { WatchListPage } from "./component/WatchListPage/WatchListPage";
import { OrderSettingPage } from "./component/OrderSettingPage/OrderSettingPage";
import { Header } from "./component/Header/Header";
import { LogInPage } from "./component/LogInPage/LogInPage";
import { useDispatch, useSelector } from "react-redux";

import { toggleSidebarStatue } from "./store/sidebarStateSlice";
import { RootState } from "../src/store/store";

const App = () => {
  const dipatch = useDispatch();
  const isSidebarActive = useSelector(
    (state: RootState) => state.sidebarState.status
  );

  const toggleSidebar = () => {
    dipatch(toggleSidebarStatue(!isSidebarActive));
  };

  return (
    <BrowserRouter>
      <Header />

      <Sidebar isOpen={isSidebarActive} toggleSidebar={toggleSidebar} />

      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/position" element={<PositionPage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/order-setting" element={<OrderSettingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
