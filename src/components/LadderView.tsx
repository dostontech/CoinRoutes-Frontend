import React, { useEffect, useState } from 'react';
import { createWebSocketConnection } from '../utils/websocket';
import { LadderViewProps, Order, WebSocketMessage } from '../types/websocket';

const LadderView: React.FC<LadderViewProps> = ({ selectedPair, aggregationIncrement }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const handleWebSocketMessage = (message: WebSocketMessage) => {
            if (message.type === 'ticker' && message.product_id === selectedPair) {
                const newBuyOrder: Order = {
                    price: parseFloat(message.best_bid),
                    size: parseFloat(message.best_bid_size),
                    side: 'buy',
                    timestamp: Date.now() // Use current time as timestamp
                };

                const newSellOrder: Order = {
                    price: parseFloat(message.best_ask),
                    size: parseFloat(message.best_ask_size),
                    side: 'sell',
                    timestamp: Date.now() // Use current time as timestamp
                };

                setOrders(prevOrders => {
                    const updatedOrders = [...prevOrders, newBuyOrder, newSellOrder];
                    const aggregatedOrders: Order[] = [];
                    updatedOrders.forEach(order => {
                        const existingOrder = aggregatedOrders.find(
                            o => o.side === order.side && Math.abs(o.price - order.price) < aggregationIncrement
                        );
                        if (existingOrder) {
                            existingOrder.size += order.size;
                        } else {
                            aggregatedOrders.push(order);
                        }
                    });

                    // Sort orders by timestamp to show latest updates on top
                    aggregatedOrders.sort((a, b) => b.timestamp - a.timestamp);

                    return aggregatedOrders;
                });
            }
        };

        const ws = createWebSocketConnection(selectedPair, handleWebSocketMessage);

        return () => {
            ws.close();
        };
    }, [selectedPair, aggregationIncrement]);

    const calculateTotals = (orders: Order[], side: 'buy' | 'sell') => {
        let total = 0;
        return orders
            .filter(order => order.side === side)
            .map(order => {
                total += order.size;
                return { ...order, total };
            });
    };

    const buyOrders = calculateTotals(orders, 'buy');
    const sellOrders = calculateTotals(orders, 'sell');
    const maxSize = Math.max(...[...buyOrders, ...sellOrders].map(order => order.size), 1);

    return (
        <div className="text-white">
            <h1 className="text-xl font-bold mb-4">Ladder View</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg h-[400px] overflow-hidden">
                    <h2 className="text-lg font-semibold mb-2 text-green-600">Buy Orders</h2>
                    <div className="relative h-full">
                        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto">
                            <table className="w-full border-collapse border border-gray-700">
                                <thead className="bg-gray-900  top-0 relative z-10 px-2">
                                    <tr className='text-left text-gray-300'>
                                        <th className="py-2">Price</th>
                                        <th className="py-2">Size</th>
                                        <th className="py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {buyOrders.map((order, index) => (
                                        <tr key={index} className="border-b border-gray-700">
                                            <td className="py-2 relative z-10">
                                                {order.price.toFixed(2)}
                                                <div
                                                    className="absolute inset-0 bg-green-600 opacity-35"
                                                    style={{
                                                        width: `${(order.size / maxSize) * 100}%`,
                                                        height: '100%',
                                                        bottom: 0
                                                    }}
                                                ></div>
                                            </td>
                                            <td className="py-2">{order.size.toFixed(2)}</td>
                                            <td className="py-2">{order.total.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg h-[400px] overflow-hidden">
                    <h2 className="text-lg font-semibold mb-2 text-red-600">Sell Orders</h2>
                    <div className="relative h-full">
                        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto">
                            <table className="w-full border-collapse border border-gray-700 ">
                                <thead className="bg-gray-900  top-0 relative z-10">
                                    <tr className='text-left'>
                                        <th className="py-2">Price</th>
                                        <th className="py-2">Size</th>
                                        <th className="py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sellOrders.map((order, index) => (
                                        <tr key={index} className="border-b border-gray-700">
                                            <td className="py-2 relative z-10">
                                                {order.price.toFixed(2)}
                                                <div
                                                    className="absolute inset-0 bg-red-600 opacity-35"
                                                    style={{
                                                        width: `${(order.size / maxSize) * 100}%`,
                                                        height: '100%',
                                                        bottom: 0
                                                    }}
                                                ></div>
                                            </td>
                                            <td className="py-2">{order.size.toFixed(2)}</td>
                                            <td className="py-2">{order.total.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LadderView;
