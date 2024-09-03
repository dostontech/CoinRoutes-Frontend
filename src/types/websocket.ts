export interface WebSocketMessage {
    type: string;
    product_id: string;
    best_bid: string;
    best_bid_size: string;
    best_ask: string;
    best_ask_size: string;
    bids: [string, string][];
    asks: [string, string][];
}

export interface WebSocketL2Update {
    type: 'l2update';
    product_id: string;
    changes: [string, string, string][];
}

export interface WebSocketTicker {
    type: 'ticker';
    product_id: string;
    best_bid: string;
    best_bid_size: string;
    best_ask: string;
    best_ask_size: string;
}
export interface AggregatedOrder {
    price: number;
    size: number;
}

export interface LadderViewProps {
    selectedPair: string;
    aggregationIncrement: number;
}
// In src/types/websocket.ts
export interface Order {
    price: number;
    size: number;
    side: 'buy' | 'sell';
    timestamp: number; // Add this field
}


export interface TickerMessage {
    type: string;
    sequence: number;
    product_id: string;
    price: string;
    open_24h: string;
    volume_24h: string;
    low_24h: string;
    high_24h: string;
    volume_30d: string;
    best_bid: string;
    best_bid_size: string;
    best_ask: string;
    best_ask_size: string;
    side: string;
    time: string;
    trade_id: number;
    last_size: string;
}

export interface RealTimeChartProps {
    selectedPair: string;
}