// src/components/SymbolsList/SymbolsList.tsx

import { useState } from 'react';
import styles from './SymbolsList.module.css';
import AddToListButton from '../AddToListButton/AddToListButton'; // Importe o AddToListButton

interface SymbolData {
  symbol: string;
}

interface SymbolsListProps {
  symbols: SymbolData[];
  onSymbolSelect: (selectedSymbols: string[]) => void;
}

function SymbolsList({ symbols, onSymbolSelect }: SymbolsListProps) {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  const handleCheckboxChange = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      setSelectedSymbols(selectedSymbols.filter((s) => s !== symbol));
    } else {
      setSelectedSymbols([...selectedSymbols, symbol]);
    }
  };

  return (
    <div className={styles['symbols-list-container']}>
      <div className={styles['search-bar']}>
        <input type="text" placeholder="Pesquisar" />
        <button>Q</button>
      </div>
      <div className={styles['symbol-items']}>
        {symbols.slice(0, 10).map((item) => (
          <div key={item.symbol} className={styles['symbol-item']}>
            <input
              type="checkbox"
              id={item.symbol}
              checked={selectedSymbols.includes(item.symbol)}
              onChange={() => handleCheckboxChange(item.symbol)}
            />
            <label htmlFor={item.symbol}>{item.symbol}</label>
          </div>
        ))}
      </div>
      <div className={styles['add-button-container']}> 
        <AddToListButton
          selectedSymbols={selectedSymbols}
          onAddToList={onSymbolSelect}
        />
      </div>
    </div>
  );
}

export default SymbolsList;