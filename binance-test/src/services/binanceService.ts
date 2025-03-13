// src/services/binanceService.ts

import { websocketData } from '../types/binance';

const WEBSOCKET_URL = 'wss://data-stream.binance.com/stream?streams=';

export function connectWebSocket(
  symbols: string[],
  onMessage: (data: websocketData) => void,
  onError: (error: Event) => void
): WebSocket {
  const streams = symbols.map((symbol) => symbol.toLowerCase() + '@ticker').join('/');
  const url = WEBSOCKET_URL + streams;
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onmessage = (event) => {
    const data: websocketData = JSON.parse(event.data);
    onMessage(data);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    onError(error);
  };

  ws.onclose = () => {
    console.log('WebSocket closed');
  };

  return ws;
}