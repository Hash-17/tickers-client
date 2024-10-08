const tickerTable = document.getElementById("tickerTable");
const bestPriceElement = document.getElementById("bestPrice");
const loader = document.getElementsByClassName("scaling-dots")[0];
const mainSec = document.getElementsByClassName("main__sec")[0];

async function fetchAllTickers() {
  console.log("Hello");
  loader.classList.add("show");
  try {
    const response = await axios.get(
      "https://tickers-server-2.onrender.com/tickers"
    );
    const data = response.data;
    console.log(data);

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
  } finally {
    loader.classList.remove("show");
    mainSec.classList.add("show");
  }
}

fetchAllTickers();
