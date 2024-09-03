import { WebSocketMessage } from '../types/websocket';

const socketUrl = 'wss://ws-feed.exchange.coinbase.com';

export const createWebSocketConnection = (productId: string, onMessage: (message: WebSocketMessage) => void) => {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
        console.log('WebSocket connection opened.');
        ws.send(JSON.stringify({
            type: 'subscribe',
            channels: [
                { name: 'ticker', product_ids: [productId] },
                { name: 'level2', product_ids: [productId] }
            ],
        }));
    };

    ws.onmessage = (event) => {
        try {
            const message: WebSocketMessage = JSON.parse(event.data);
            onMessage(message);
        } catch (error) {
            console.error('Failed to parse WebSocket message', error);
        }
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed.');
    };

    return ws;
};
