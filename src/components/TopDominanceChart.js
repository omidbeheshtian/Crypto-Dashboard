import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MarketDominanceChart = () => {
  const [dominanceData, setDominanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/global");
        const marketData = response.data.data.market_cap_percentage;

        // Fetch 5 Best Crypto`s of market
        const topCoins = Object.entries(marketData)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        const labels = topCoins.map((coin) => coin[0].toUpperCase());
        const data = topCoins.map((coin) => coin[1]);

        setDominanceData({
          labels,
          datasets: [
            {
              label: "Dominance %",
              data,
              backgroundColor: ["#f7931a", "#627eea", "#3c3c3d", "#ff2d55", "#00aaff"],
              borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("We have this error at fetching data:", error);
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div>
      <h2>{/*We can add some text here*/}</h2>
      {loading ? (
        <p>Getting Data of dominance % from API ...</p>
      ) : (
        <div style={{ height: "400px", width: "100%" }}>
          <Pie data={dominanceData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      )}
    </div>
  );
};

export default MarketDominanceChart;
