import useFetch from "../hooks/useFetch";
 
interface SymbolData {
  symbol: string;
}
 
interface ApiResponse {
  symbols: SymbolData[];
}
 
function Home() {
  const { data, loading, error } = useFetch<ApiResponse>(
    "https://api.binance.com/api/v3/exchangeInfo"
  );
 
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!data || !data.symbols) return <p>Dados não encontrados</p>;
 
  return (
    <div>
        <ul>
                {data.symbols.map((item) => (
        <li key={item.symbol}>{item.symbol}</li>
                ))}
        </ul>
    </div>
  );
}
 
export default Home;
