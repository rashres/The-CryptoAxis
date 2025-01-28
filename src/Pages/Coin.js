import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Common/Header';
import Loader from '../Components/Common/Loader';
import { coinObject } from '../Functions/convertObject';
import List from '../Components/Dashboard/List';
import CoinInfo from '../Components/Coin/CoinInfo';
import { getCoinData } from '../Functions/getCoinData';
import { getCoinPrices } from '../Functions/getCoinPrices';
import LineChart from '../Components/Coin/LineChart';
import { convertDate } from '../Functions/convertDate';
import SelectDays from '../Components/Coin/SelectDays';
import { settingChartData } from '../Functions/settingChartData';
import PriceType from '../Components/Coin/PriceType';

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [coinData, setCoinData] = React.useState(null);
  const [days, setDays] = React.useState(60);
  const [chartData, setChartData] = React.useState({});
  const [priceType, setPriceType] = React.useState('prices'); // default is "prices"

  React.useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  // Fetch coin data & default chart data
  async function getData() {
    setIsLoading(true);
    try {
      const data = await getCoinData(id);
      if (data) {
        // Convert & set coin info
        coinObject(setCoinData, data);

        // IMPORTANT: Pass priceType as well:
        const prices = await getCoinPrices(id, days, priceType);

        if (prices && prices.length > 0) {
          setChartData({
            labels: prices.map((p) => convertDate(p[0])),
            datasets: [
              {
                data: prices.map((p) => p[1]),
                borderWidth: 4,
                fill: true,
                tension: 0.25,
                backgroundColor: 'rgba(58, 128, 233, 0.1)',
                borderColor: '#3a80e9',
                pointRadius: 0,
              },
            ],
          });
        }
      }
    } catch (error) {
      console.error('Error loading coin data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // When user changes the "days" select
  const handleDaysChange = async (event) => {
    setIsLoading(true);
    const newDays = event.target.value;
    setDays(newDays);

    try {
      // Again, pass priceType so the correct field is retrieved
      const prices = await getCoinPrices(id, newDays, priceType);
      if (prices && prices.length > 0) {
        settingChartData(setChartData, prices);
      }
    } catch (error) {
      console.error('Error loading coin prices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // When user toggles "Price / Market Cap / Volume"
  const handlePriceTypeChange = async (event, newType) => {
    if (!newType) return; // Ignore if user double-clicks the same button
    setIsLoading(true);
    setPriceType(newType);

    try {
      // Fetch for the same "days" but new "priceType"
      const prices = await getCoinPrices(id, days, newType);
      if (prices && prices.length > 0) {
        settingChartData(setChartData, prices);
      }
    } catch (error) {
      console.error('Error loading coin prices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper" style={{ padding: '0rem 1rem' }}>
            <List coin={coinData} />
          </div>

          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
            <LineChart chartData={chartData} priceType={priceType}/>
          </div>

          <CoinInfo
            heading={coinData ? coinData.name : ''}
            desc={coinData ? coinData.desc : ''}
          />
        </>
      )}
    </div>
  );
}

export default CoinPage;
