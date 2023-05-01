async function getIbovespaQuotes() {
    const url = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=^BVSP";
    const response = await fetch(url);
    const data = await response.json();
    const quotes = data.quoteResponse.result[0];
    const symbol = quotes.symbol;
    const date = new Date(quotes.regularMarketTime);
    const open = quotes.regularMarketOpen;
    const close = quotes.regularMarketPrice;
    
    return {
      symbol,
      date: date.toLocaleDateString(),
      open: open.toFixed(2),
      close: close.toFixed(2)
    };
  }
  
  async function updateTable() {
    const table = document.getElementById("table");
    table.innerHTML = "";
  
    const quotes = await getIbovespaQuotes();
  
    const row = table.insertRow();
    const symbolCell = row.insertCell();
    const dateCell = row.insertCell();
    const openCell = row.insertCell();
    const closeCell = row.insertCell();
  
    symbolCell.innerText = quotes.symbol;
    dateCell.innerText = quotes.date;
    openCell.innerText = quotes.open;
    closeCell.innerText = quotes.close;
  }
  
  updateTable();