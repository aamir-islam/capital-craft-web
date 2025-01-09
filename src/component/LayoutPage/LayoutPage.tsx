import React, { ReactElement } from "react";
import "./style.css";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface LayoutProps {
  children: ReactElement;
  headerName: string;
}

export const LayoutPage: React.FC<LayoutProps> = ({ children, headerName }) => {
  const isSidebarActive = useSelector(
    (state: RootState) => state.sidebarState.status
  );
  return (
    <div
      className="layout-container"
      style={{ paddingLeft: isSidebarActive ? "12%" : "2%" }}
    >
      <Typography variant="h5">{headerName}</Typography>
      <div>{children}</div>
    </div>
  );
};
