// Requisição à API da Binance para buscar todos os símbolos de negociação (pares de moedas, como BTC/USDT, ETH/BTC etc.)

import axios from "axios";

const API_URL = " https://api.binance.com/api/v3/exchangeInfo";

export const getBinanceSymbols = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.symbols; // Retorna apenas a lista de símbolos
  } catch (error) {
    console.error("Erro ao buscar os símbolos:", error);
    // Lançar o erro para ser tratado no componente
    throw new Error("Falha ao buscar os símbolos da Binance.");
  }
};
