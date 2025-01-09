import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import useWatchList from "./useWatchList";
import { LayoutPage } from "../LayoutPage/LayoutPage";
import { WatchListTable } from "./WatchListTable";

export const WatchListPage: React.FC = () => {
  const { query, addToWatchlist, filterList, handleData } = useWatchList();

  return (
    <LayoutPage headerName="Watch List">
      <div>
        <Typography variant="h4">Welcome to the WatchList Page</Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch" },
            position: "relative",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            value={query}
            onChange={handleData}
          />
        </Box>
        <WatchListTable />

        <List
          dense
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "absolute",
            top: 0,
            right: 0,
            overflow: "auto",
            maxHeight: 500,
            "& ul": { padding: 0 },
          }}
        >
          {filterList &&
            filterList.map((value) => {
              return (
                <ListItem
                  key={value.instrument_key}
                  disablePadding
                  divider={true}
                >
                  <ListItemButton>
                    <ListItemText primary={value.trading_symbol} />

                    <Button
                      variant="contained"
                      onClick={() => addToWatchlist(value)}
                    >
                      add
                    </Button>
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </div>
    </LayoutPage>
  );
};
