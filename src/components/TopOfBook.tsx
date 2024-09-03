import React, { useEffect, useState } from 'react';
import { createWebSocketConnection } from '../utils/websocket';
import { WebSocketMessage } from '../types/websocket';

interface TopOfBookProps {
    selectedPair: string;
}

const TopOfBook: React.FC<TopOfBookProps> = ({ selectedPair }) => {
    const [bestBid, setBestBid] = useState<number | null>(null);
    const [bestBidSize, setBestBidSize] = useState<number | null>(null);
    const [bestAsk, setBestAsk] = useState<number | null>(null);
    const [bestAskSize, setBestAskSize] = useState<number | null>(null);

    useEffect(() => {
        const handleWebSocketMessage = (message: WebSocketMessage) => {
            if (message.type === 'ticker' && message.product_id === selectedPair) {
                setBestBid(parseFloat(message.best_bid));
                setBestBidSize(parseFloat(message.best_bid_size));
                setBestAsk(parseFloat(message.best_ask));
                setBestAskSize(parseFloat(message.best_ask_size));
            }
        };

        const ws = createWebSocketConnection(selectedPair, handleWebSocketMessage);

        return () => {
            ws.close();
        };
    }, [selectedPair]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Top of Book</h2>
            <div className="mt-4 flex space-x-4">
                <div className="flex-1 bg-gray-800 p-4 rounded-lg mb-auto">
                    <p className="text-lg text-white pb-0 mb-0">Best Bid:</p>
                    <p className="text-xl font-bold text-green-500 pt-0 mt-0">{bestBid !== null ? `$${bestBid.toFixed(2)}` : 'Loading...'}</p>
                    <p className="text-lg text-white mb-0 pb-0">Quantity:</p>
                    <p className="text-xl font-bold text-green-300 pt-0 mt-0">{bestBidSize !== null ? `${bestBidSize.toFixed(2)} ${selectedPair.split('-')[0]}` : 'Loading...'}</p>
                </div>
                <div className="flex-1 bg-gray-800 p-4 rounded-lg">
                    <p className="text-lg text-white mb-0 pb-0">Best Ask:</p>
                    <p className="text-xl font-bold text-red-500 mt-0 pt-0">{bestAsk !== null ? `$${bestAsk.toFixed(2)}` : 'Loading...'}</p>
                    <p className="text-lg text-white mb-0 pb-0">Quantity:</p>
                    <p className="text-xl font-bold text-red-400 pt-0 mt-0">{bestAskSize !== null ? `${bestAskSize.toFixed(2)} ${selectedPair.split('-')[0]}` : 'Loading...'}</p>
                </div>
            </div>
        </div>
    );
};

export default TopOfBook;
