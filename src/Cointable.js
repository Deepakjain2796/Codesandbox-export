import React, { useState, useEffect } from "react";

const CoinTable = () => {
  const [data, setData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(50);
  const [filteredData, setFilteredData] = useState([]);

  fetchCurrencies = () => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then(({ data }) => {
        console.log(data);
        setData(data);
      });
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setFilteredData(data.slice(0, totalEntries));
  }, [totalEntries, data]);

  const loadMore = () => {
    setTotalEntries((prev) => prev + 50);
  };

  const renderLoadMore = () => {
    if (totalEntries < data.length) {
      return <button onClick={loadMore}>Load More</button>;
    }
    return null;
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((currency) => (
            <tr key={currency.id}>
              <td>{currency.rank}</td>
              <td>{currency.name}</td>
              <td>{currency.priceUsd}</td>
              <td>{currency.marketCapUsd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderLoadMore()}
    </>
  );
};

export default CoinTable;
