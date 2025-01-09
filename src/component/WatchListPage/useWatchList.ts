import { InstrumentData } from "./type";
import { useGetWatchListDataQuery } from "../../store/watchListApi";
import { ChangeEvent, useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/fierbase";

const useWatchList = ()=>{
    const [query, setQuery] = useState<string>("");
    const [filterList, setFilterList]  = useState<InstrumentData[]>()
    const [myWatchList, setWatchList] = useState<InstrumentData[]>()
    
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
        const filterData = data.data.filter((item: InstrumentData) => {
          return  value && item.strike_price
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        });
        
        setFilterList(filterData)
      }
    };

    const addToWatchlist = async (item:InstrumentData) => {
      
      try {
        const docRef = await addDoc(collection(db, 'watchlist'), {
          exchange : item.exchange,
          expiry : item.expiry,
          instrument_key : item.instrument_key,
          instrument_type : item.instrument_type,
          name : item.name,
          segment : item.segment,
          trading_symbol : item.trading_symbol,
          weekly : item.weekly
        });
        console.log('Document written with ID: ', docRef.id);
        
      } catch (err) {
        console.error('Error adding document: ', err);
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
  
          console.log("ProductList:", productList); 
          setWatchList(productList)
          // Set the products state with the fetched data
        } catch (err) {
          console.log("Failed to fetch products");
          console.error(err);
        } 
      };
  
      fetchData();
    }, []);
    
    return {
        handleData,
        query,
        filterList,
        myWatchList,
        addToWatchlist

    }
}
export default useWatchList