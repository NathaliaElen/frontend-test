import React, { useState, useEffect } from "react";
import { getBinanceSymbols } from "../services/binanceService";

const SymbolList: React.FC = () => {
  const [symbols, setSymbols] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const data = await getBinanceSymbols();
        setSymbols(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchSymbols();
  }, []);

  const filteredSymbols = symbols.filter((symbol: any) =>
    symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      setSelectedSymbols(selectedSymbols.filter((s) => s !== symbol));
    } else {
      setSelectedSymbols([...selectedSymbols, symbol]);
    }
  };

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h2>Symbol List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredSymbols.map((symbol: any) => (
          <li key={symbol.symbol}>
            <input
              type="checkbox"
              checked={selectedSymbols.includes(symbol.symbol)}
              onChange={() => handleCheckboxChange(symbol.symbol)}
            />
            {symbol.symbol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymbolList;