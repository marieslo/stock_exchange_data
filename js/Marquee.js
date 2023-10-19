import { baseURL, marquee } from './constants.js';

class Marquee {
  constructor(symbol, price) {
    this.symbol = symbol;
    this.price = price;
  }
}

async function currentStockDetails() {
  try {
    const response = await fetch(
      new URL(`stock-screener?&exchange=NASDAQ`, baseURL)
    );
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error();
    }

    const stockItems = data.map(
      (stock) => new Marquee(stock.symbol, stock.price)
    );
    return stockItems;
  } catch (error) {
    console.error(error);
    return null;
  }
}

currentStockDetails().then((stockItems) => {
  if (stockItems) {
    const stockInfo = stockItems
      .map((stock) => {
        const price = `<span class="text-success">$${stock.price}</span>`;
        return `${stock.symbol}: ${price}`;
      })
      .join("  |  ");
    marquee.innerHTML = stockInfo;
    
  }
});