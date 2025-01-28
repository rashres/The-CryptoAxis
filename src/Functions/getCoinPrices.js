import axios from "axios";

// getCoinPrices.js
export const getCoinPrices = async (id, days, priceType = "prices") => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );
      const rawData = response.data && response.data[priceType];
  
      // Return an empty array if the property is missing:
      return Array.isArray(rawData) ? rawData : [];
    } catch (err) {
      console.log("ERROR>>>>", err);
      return [];
    }
  };
  