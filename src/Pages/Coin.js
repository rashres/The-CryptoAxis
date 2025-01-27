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
import LineChart from '../Components/Coin/LineChart'
import { label } from 'framer-motion/client'
import { BorderColor } from '@mui/icons-material'
import { convertDate } from '../Functions/convertDate'
import SelectDays from '../Components/Coin/SelectDays'
import { settingChartData } from '../Functions/settingChartData'

function CoinPage() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(true);
  const [coinData, setCoinData] = React.useState();
  const [days, setDays] = React.useState(60);
  const [chartData, setChartData] = React.useState({});

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

      setChartData({
        labels: prices.map((price) => convertDate(price[0])),
        datasets: [
          {
            data: prices.map((price) => price[1]),
            borderColor: "3a80e9",
            borderWidth: 4,
            fill: true,
            tension: 0.25,
            backgroundColor: "rgba(58, 128, 233, 0.1",
            borderColor: "#3a80e9",
            pointRadius: 0,  
          },
        ],
      });
      setIsLoading(false);
      }
    }
  }

  const handleDaysChange = async (event) => {
    setIsLoading(true);
    
    // Store the user's new selection in a local variable
    const newDays = event.target.value;
    
    // Update state with the new value
    setDays(newDays);
  
    const prices = await getCoinPrices(id, newDays);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
    }
    
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      {isLoading ? (
         <Loader /> 
       ) : ( 
        <>
        <div className="grey-wrapper" style={{padding: "0rem 1rem"}}>
          <List coin={coinData}/>
        </div>
        <div className="grey-wrapper">
          <SelectDays days={days} handleDaysChange={handleDaysChange}/>
          <LineChart chartData={chartData}/>
        </div>
        <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
    )}
    </div>
  );
}

export default CoinPage
