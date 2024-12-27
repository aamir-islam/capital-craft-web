import { Typography } from "@mui/material";
import { useGetWatchListDataQuery } from "../../store/watchListApi";

export const WatchListPage: React.FC = () => {
  const { data, isFetching } = useGetWatchListDataQuery(
    {
      path: "option/contract",
      params: [{ name: "instrument_key", value: "NSE_INDEX|Nifty 50" }],
    },
    { refetchOnMountOrArgChange: true }
  );

  console.log("data:", data, "isFetching:", isFetching);
  return (
    <div>
      <Typography variant="h4">Welcome to the WatchList Page</Typography>
    </div>
  );
};
