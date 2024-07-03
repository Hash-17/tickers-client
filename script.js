document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:7000/tickers");
  const data = await response.json();
  const tickerTable = document.getElementById("ticker-table");

  data.data.forEach((ticker) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${ticker.name}</td>
            <td>${ticker.base_unit}</td>
            <td>${ticker.last}</td>
            <td>${ticker.volume}</td>
            <td>${ticker.buy}</td>
            <td>${ticker.sell}</td>
        `;
    tickerTable.appendChild(row);
  });
});
