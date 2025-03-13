// src/components/PriceMonitor/PriceMonitor.tsx

import { useState, useEffect } from 'react';
// import { connectWebSocket } from '../services/binanceService';
import { websocketData, PriceUpdate } from '../../types/binance';
import styles from './PriceMonitor.module.css';

interface PriceMonitorProps {
  symbols: string[];
}

function PriceMonitor({ symbols }: PriceMonitorProps) {
  const [priceUpdates, setPriceUpdates] = useState<PriceUpdate[]>([]);

  useEffect(() => {
    if (symbols && symbols.length > 0) {
      const ws = connectWebSocket(
        symbols,
        (data: websocketData) => {
          setPriceUpdates((prevUpdates) => {
            const update = data.data;
            const existingIndex = prevUpdates.findIndex((u) => u.s === update.s);
            if (existingIndex !== -1) {
              const newUpdates = [...prevUpdates];
              newUpdates[existingIndex] = update;
              return newUpdates;
            } else {
              return [...prevUpdates, update];
            }
          });
        },
        (error) => {
          console.error('WebSocket error:', error);
        }
      );

      return () => {
        ws.close();
      };
    }
  }, [symbols]);

  return (
    <div className={styles['price-monitor-container']}>
      <div className={styles['list-options']}>
        <select>
          <option value="listA">List A</option>
          {/* Adicione outras listas aqui se necessário */}
        </select>
        <button>+</button>
      </div>
      <h2>Monitor de Preços</h2>
      <table>
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Último Preço</th>
            <th>Melhor Compra</th>
            <th>Melhor Venda</th>
            <th>Variação (%)</th>
          </tr>
        </thead>
        <tbody>
          {priceUpdates.map((update) => (
            <tr key={update.s}>
              <td>{update.s}</td>
              <td>{update.c}</td>
              <td>{update.b}</td>
              <td>{update.a}</td>
              <td>{update.P}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PriceMonitor;