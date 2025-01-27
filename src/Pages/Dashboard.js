import axios from 'axios';
import React, { useEffect } from 'react'
import Header from '../Components/Common/Header';
import TabsComponent from '../Components/Dashboard/Tabs';
import Search from '../Components/Dashboard/Search';
import PaginationComponent from '../Components/Dashboard/Pagination';
import Loader from '../Components/Common/Loader';
import BackToTop from '../Components/Common/BackToTop';

function DashboardPage() {
    const [coins, setCoins] = React.useState([]);
    const [paginatedCoins, setPaginatedCoins] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);

    const handlePageChange = (event, value) => {
      setPage(value);
      var previousIndex = (value -1) * 10;
      setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10))
    };

    const onSearchChange = (e) => {
      console.log(e.target.value);
      setSearch(e.target.value);
    };

    var filteredCoins = coins.filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.symbol.toLowerCase().includes(search.toLocaleLowerCase())
    );

    React.useEffect(() => {
        axios
          .get(
            'https://api.coingecko.com/api/v3/coins/markets',
            {
              params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false,
              },
            },
          )
          .then((response) => {
            console.log("RESPONSE>>>", response.data);
            // *** Here, store the fetched coins in the state:
            setCoins(response.data);
            setPaginatedCoins(response.data.slice(0, 10))
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("ERROR>>>", error);
            setIsLoading(false);
          });
      }, []);
      

  return (
    <>
    <Header /> 
    <BackToTop/>
    {isLoading ?( 
        <Loader />
      ) : (
      <div>
        <Search search={search} onSearchChange={onSearchChange}/>
        <TabsComponent coins={search?filteredCoins : paginatedCoins}/>
        { !search && (
          <PaginationComponent page={page} handlePageChange={handlePageChange}/>
        )}
      </div>
      )}
    </>
  );
}
export default DashboardPage
