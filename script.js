document.addEventListener("DOMContentLoaded", async () => {
  const tickerTable = document.getElementById("tickerTable");
  const bestPriceElement = document.getElementById("bestPrice");

  async function fetchAllTickers() {
    try {
      const response = await fetch(
        "https://tickers-server.onrender.com/tickers"
      );
      const data = await response.json();

      let bestPrice = 0;
      let bestPlatform = "";

      data.data.forEach((ticker, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${ticker.name}</td>
          <td>₹ ${ticker.last}</td>
          <td>₹ ${ticker.buy} / ₹ ${ticker.sell}</td>
          <td>${(((ticker.sell - ticker.buy) / ticker.buy) * 100).toFixed(
            2
          )}%</td>
          <td>₹ ${(ticker.sell - ticker.buy).toFixed(2)}</td>
        `;
        tickerTable.appendChild(row);

        if (parseFloat(ticker.last) > bestPrice) {
          bestPrice = parseFloat(ticker.last);
          bestPlatform = ticker.name;
        }
      });

      bestPriceElement.textContent = `₹ ${bestPrice}`;
    } catch (error) {
      console.error("Error fetching tickers:", error);
    }
  }

  await fetchAllTickers();
});
