import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from '../Components/Common/Header'
import Loader from '../Components/Common/Loader'
import { coinObject } from '../Functions/convertObject'
import List from '../Components/Dashboard/List'
import CoinInfo from '../Components/Coin/CoinInfo'
import { getCoinData } from '../Functions/getCoinData'
import { getCoinPrices } from '../Functions/getCoinPrices'

function CoinPage() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(true);
  const [coinData, setCoinData] = React.useState();
  const [days, setDays] = React.useState(30);

  React.useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  async function getData() {

    const data = await getCoinData(id);
    if(data) {
    coinObject(setCoinData, data)
    const prices = await getCoinPrices(id,days);
      if(prices.length > 0){
      console.log("WOHOOO");
      setIsLoading(false);
      }
    }
  }

  return (
    <div>
      <Header />
      {isLoading ? (
         <Loader /> 
       ) : ( 
        <>
        <div className="grey-wrapper">
        <List coin={coinData}/>
        </div>
        <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
    )}
    </div>
  );
}

export default CoinPage
