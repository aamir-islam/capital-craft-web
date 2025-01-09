import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import useWatchList from "./useWatchList";
export const WatchListTable: React.FC = () => {
  const { myWatchList } = useWatchList();
  return (
    <div>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: "75vh",
          "& ul": { padding: 0 },
        }}
      >
        {myWatchList ? (
          <ul>
            {myWatchList &&
              myWatchList.map((item) => (
                <ListItem divider={true} key={item.instrument_key}>
                  <ListItemText primary={item.trading_symbol} />
                </ListItem>
              ))}
          </ul>
        ) : (
          <Typography variant="h5">
            It’s empty in here Go on, add a scrip to this watchlist
          </Typography>
        )}
      </List>
    </div>
  );
};
