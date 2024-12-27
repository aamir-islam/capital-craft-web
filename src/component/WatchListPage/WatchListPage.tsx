import { Box, TextField, Typography } from "@mui/material";
import { useGetWatchListDataQuery } from "../../store/watchListApi";
import { ChangeEvent, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/fierbase";

export type InstrumentData = {
  name?: string;
  segment?: string;
  exchange?: string;
  expiry: string; // Date string format
  weekly: boolean;
  instrument_key: string;
  exchange_token: string;
  trading_symbol: string;
  tick_size: number;
  lot_size: number;
  instrument_type: string;
  freeze_quantity: number;
  underlying_key: string;
  underlying_type: string;
  underlying_symbol: string;
  strike_price: number;
  minimum_lot: number;
};

export const WatchListPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const { data } = useGetWatchListDataQuery(
    {
      path: "option/contract",
      params: [
        { name: "instrument_key", value: "NSE_INDEX|Nifty 50" },
        { name: "segment", value: "NSE_FO" },
        { name: "instrument_type", value: "CE" },
        { name: "strike_price", value: 23750 },
      ],
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    if (data && data.data) {
      const filterData = data.data.filter((item: unknown) => {
        return item.strike_price
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      console.log("value:", value, filterData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "watchlist")); // Access the 'products' collection
        const productList: InstrumentData[] = [];

        querySnapshot.forEach((doc) => {
          productList.push(doc.data() as InstrumentData); // Push document data into productList array
        });

        console.log("ProductList:", productList); // Set the products state with the fetched data
      } catch (err) {
        console.log("Failed to fetch products");
        console.error(err);
      } finally {
        console.log(false);
      }
    };

    fetchData();
  }, []);

  // console.log("data:", data, "isFetching:", isFetching);
  return (
    <div>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
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

      <Typography variant="h4">Welcome to the WatchList Page</Typography>
    </div>
  );
};
