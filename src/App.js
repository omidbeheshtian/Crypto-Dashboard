import React from "react";
import BitcoinChart from "./components/BitcoinChart";
import BitcoinPrice from "./components/BitcoinPrice";
import TopDominanceChart from "./components/TopDominanceChart";
import "./index.css"; // import css files of project

const App = () => {
  return (
    <div className="dashboard">
      {/* Bitcoin 1 year Chart get with CoinGecko free API */}
      <div className="card big-chart">
        <h2>Bitcoin Yearly Performance</h2>
        <BitcoinChart />
      </div>

      {/*  Side Section for BTC live price and Top 5 market Dominance with PIE CHART */}
      <div className="side-section">
        <div className="card">
          <h2>Bitcoin Live Price</h2>
          <BitcoinPrice />
        </div>

        <div className="card">
          <h2>Top 5 Market Dominance</h2>
          <TopDominanceChart />
        </div>
      </div>
    </div>
  );
};

export default App;
