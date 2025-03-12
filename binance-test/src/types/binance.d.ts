// types/binance.d.ts

export interface Symbol {
    symbol: string;
  }
  
  export interface ExchangeInfo {
    symbols: Symbol[];
  }
  
  export interface PriceUpdate {
    e: string;
    E: number;
    s: string;
    p: string;
    P: string;
    w: string;
    x: string;
    c: string;
    Q: string;
    b: string;
    B: string;
    a: string;
    A: string;
    o: string;
    h: string;
    l: string;
    v: string;
    q: string;
    O: number;
    C: number;
    F: number;
    L: number;
    n: number;
  }
  
  export interface websocketData {
    data: PriceUpdate;
  }