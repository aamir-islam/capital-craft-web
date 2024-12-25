import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Sidebar from "./routes/Sidebar";
import { HomePage } from "./component/HomePage/HomePage";
import { ProfilePage } from "./component/ProfilePage/ProfilePage";
import { PositionPage } from "./component/PositionPage/PositionPage";
import { WatchListPage } from "./component/WatchListPage/WatchListPage";
import { OrderSettingPage } from "./component/OrderSettingPage/OrderSettingPage";
import { useState } from "react";
import { Header } from "./component/Header/Header";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <BrowserRouter>
      <Header />
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div style={{ display: "flex", flexGrow: 1 }}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main style={{ flexGrow: 1, padding: "16px", overflowY: "auto" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/position" element={<PositionPage />} />
              <Route path="/watchlist" element={<WatchListPage />} />
              <Route path="/order-setting" element={<OrderSettingPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
