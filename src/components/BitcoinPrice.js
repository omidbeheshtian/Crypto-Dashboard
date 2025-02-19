import React, { useState, useEffect } from "react";
import axios from "axios";

const BitcoinPrice = () => {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
        );
        setPrice(response.data.bitcoin.usd);
        setChange(response.data.bitcoin.usd_24h_change.toFixed(2));
        setLoading(false);
      } catch (error) {
        console.error("We have this error for getting price:", error);
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>{/* we can add some text here */}</h2>
      {loading ? (
        <p>Getting From API ...</p>
      ) : (
        <div>
          <p>${price}</p>
          <p className={`$change >= 0`}>
            {change}% : 24h change {change >= 0 ? "📈" : "📉"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BitcoinPrice;
