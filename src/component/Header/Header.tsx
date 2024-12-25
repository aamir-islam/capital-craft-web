import { Divider, Typography } from "@mui/material";

export const Header: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" noWrap>
        Header
      </Typography>
      <Divider />
    </div>
  );
};
