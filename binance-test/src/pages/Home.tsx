// src/Home/Home.tsx

import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import SymbolsList from "../components/SymbolsList/SymbolsList";
import PriceMonitor from "../components/PriceMonitor/PriceMonitor";
import styles from './Home.module.css';

interface SymbolData {
    symbol: string;
}

interface ApiResponse {
    symbols: SymbolData;
}

function Home() {
    const { data, loading, error } = useFetch<ApiResponse>(
        "https://api.binance.com/api/v3/exchangeInfo"
    );
    const [symbols, setSymbols] = useState<SymbolData>(); // Estado para armazenar os símbolos
    const [selectedSymbols, setSelectedSymbols] = useState<string>();
    const [symbolsToMonitor, setSymbolsToMonitor] = useState<string>();

    useEffect(() => {
        if (data && data.symbols) {
            setSymbols(data.symbols); // Atualiza o estado quando os dados chegam
        }
    }, [data]);

    const handleSymbolSelect = (symbols: string) => {
        setSymbolsToMonitor([...symbolsToMonitor, ...symbols]);
        setSelectedSymbols();
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;
    if (!symbols) return <p>Dados não encontrados</p>; // Verifica se symbols está preenchido

    return (
        <div className={styles['home-container']}>
            <SymbolsList symbols={symbols} onSymbolSelect={handleSymbolSelect} /> {/* Passa symbols */}
            <PriceMonitor symbols={symbolsToMonitor} />
        </div>
    );
}

export default Home;