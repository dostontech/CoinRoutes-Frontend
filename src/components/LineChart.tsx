import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { RealTimeChartProps, TickerMessage } from '../types/websocket';

const LineChart: React.FC<RealTimeChartProps> = ({ selectedPair }) => {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        title: {
            text: 'Live Bid and Ask Prices',
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Price',
            },
        },
        series: [
            {
                name: 'Bid Price',
                data: [] as [number, number][],
                type: 'line',
                color: 'green',
                tooltip: {
                    valueDecimals: 2,
                },
            },
            {
                name: 'Ask Price',
                data: [] as [number, number][],
                type: 'line',
                color: 'red',
                tooltip: {
                    valueDecimals: 2,
                },
            },
        ],
    });

    useEffect(() => {
        const handleWebSocketMessages = (message: string) => {
            const data: TickerMessage = JSON.parse(message);

            if (data.type === 'ticker' && data.product_id === selectedPair) {
                const timestamp = new Date(data.time).getTime();
                const bidPrice = parseFloat(data.best_bid);
                const askPrice = parseFloat(data.best_ask);

                setChartOptions(prevOptions => {
                    const bidSeries = (prevOptions.series && prevOptions.series[0]) as Highcharts.SeriesLineOptions || { data: [] as [number, number][] };
                    const askSeries = (prevOptions.series && prevOptions.series[1]) as Highcharts.SeriesLineOptions || { data: [] as [number, number][] };

                    const newBidData: [number, number][] = [
                        ...(bidSeries.data as [number, number][] || []),
                    ];
                    const newAskData: [number, number][] = [
                        ...(askSeries.data as [number, number][] || []),
                    ];

                    newBidData.push([timestamp, bidPrice]);
                    newAskData.push([timestamp, askPrice]);

                    if (newBidData.length > 100) {
                        newBidData.shift();
                    }
                    if (newAskData.length > 100) {
                        newAskData.shift();
                    }

                    return {
                        ...prevOptions,
                        series: [
                            {
                                ...bidSeries,
                                data: newBidData,
                            },
                            {
                                ...askSeries,
                                data: newAskData,
                            },
                        ],
                    };
                });
            }
        };

        const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

        ws.onopen = () => {
            console.log('WebSocket connection opened.');
            ws.send(JSON.stringify({
                type: 'subscribe',
                channels: [{ name: 'ticker', product_ids: [selectedPair] }],
            }));
        };

        ws.onmessage = (event) => {
            handleWebSocketMessages(event.data);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        return () => {
            ws.close();
        };
    }, [selectedPair]);

    return (
        <>
            <h2 className="text-xl font-bold mb-4">Cryptocurrency Market Data</h2>
            <div className="chart-container bg-white p-4 rounded-lg shadow-md">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        </>
    );
};

export default LineChart;
