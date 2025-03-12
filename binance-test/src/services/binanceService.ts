// Requisição à API da Binance para buscar todos os símbolos de negociação (pares de moedas, como BTC/USDT, ETH/BTC etc.)

import { ExchangeInfo, Symbol, websocketData } from '../types/binance';

const API_URL = 'https://api.binance.com/api/v3/exchangeInfo';
const WEBSOCKET_URL = 'wss://data-stream.binance.com/stream?streams=';

export async function getSymbols(): Promise<Symbol[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ExchangeInfo = await response.json();
    return data.symbols;
  } catch (error) {
    console.error('Error fetching symbols:', error);
    return [];
  }
}
