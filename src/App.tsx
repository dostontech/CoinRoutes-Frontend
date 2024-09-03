import React, { useState } from 'react';
import TopOfBook from './components/TopOfBook';
import LadderView from './components/LadderView';
import RealTimeChart from './components/LineChart';
import Layout from './components/Layout';

const currencyPairs = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD'];
const aggregationOptions = [
  { value: 0.01, label: '$0.01' },
  { value: 0.05, label: '$0.05' },
  { value: 0.10, label: '$0.10' },
  { value: 0.50, label: '$0.50' },
  { value: 1.00, label: '$1.00' },
];

const App: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<string>('BTC-USD');
  const [aggregationIncrement, setAggregationIncrement] = useState<number>(0.01);

  const handleAggregationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAggregationIncrement(parseFloat(event.target.value));
  };

  return (
    <Layout>
      <header className="px-4 py-2 m-4 bg-gray-700 rounded-lg">
        <h2 className="text-white text-lg md:text-xl">CoinRoutes Frontend</h2>
      </header>
      <main className="container mx-auto m-4 px-4 md:px-10">
        <div className="text-white">
          <div className="mb-4">
            <label htmlFor="currency-pair" className="text-white text-lg">Select Currency Pair:</label>
            <select
              id="currency-pair"
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="ml-2 p-2 text-lg rounded border border-gray-600 bg-gray-700 text-white"
            >
              {currencyPairs.map(pair => (
                <option key={pair} value={pair}>{pair}</option>
              ))}
            </select>
            <TopOfBook selectedPair={selectedPair} />
          </div>
          <div className="mb-4">
            <label htmlFor="aggregation" className="text-white text-lg">Aggregation Increment:</label>
            <select
              id="aggregation"
              value={aggregationIncrement}
              onChange={handleAggregationChange}
              className="ml-2 p-2 text-lg rounded border border-gray-600 bg-gray-700 text-white"
            >
              {aggregationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 min-w-0 mb-4 md:mb-0 md:pr-4">
              <LadderView selectedPair={selectedPair} aggregationIncrement={aggregationIncrement} />
            </div>
            <div className="flex-1 min-w-0 mb-4 md:mb-0">
              <RealTimeChart selectedPair={selectedPair} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default App;
