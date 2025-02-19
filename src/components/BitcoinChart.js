import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BitcoinChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365"
        );

        const prices = response.data.prices;
        const labels = prices.map((price) => format(new Date(price[0]), "MMM yyyy"));
        const data = prices.map((price) => price[1]);

        setChartData({
          labels,
          datasets: [
            {
              label: "BTC Price Chart (1 Year)",
              data,
              borderColor: "#f7931a",
              backgroundColor: "rgba(247, 147, 26, 0.2)",
              tension: 0.2,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("We have this error in getting chart data:", error);
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      <h2>{/*We can add some Text here*/}</h2>
      {loading ? (
        <p>Getting data from API ...</p>
      ) : (
        <div style={{ height: "400px", width: "100%" }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: false },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BitcoinChart;