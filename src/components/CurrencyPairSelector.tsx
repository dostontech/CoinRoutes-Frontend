// src/components/CurrencyPairSelector.tsx

import React from 'react';

type CurrencyPairSelectorProps = {
    selectedPair: string;
    onPairChange: (pair: string) => void;
};

const CurrencyPairSelector: React.FC<CurrencyPairSelectorProps> = ({ selectedPair, onPairChange }) => {
    return (
        <div className="selector">
            <label htmlFor="currencyPair" className="text-white">Select Currency Pair:</label>
            <select
                id="currencyPair"
                value={selectedPair}
                onChange={(e) => onPairChange(e.target.value)}
                className="p-2 rounded border border-gray-300 ml-2"
            >
                <option value="BTC-USD">BTC-USD</option>
                <option value="ETH-USD">ETH-USD</option>
                <option value="LTC-USD">LTC-USD</option>
                <option value="ETH-BTC">ETH-BTC</option>
            </select>
        </div>
    );
};

export default CurrencyPairSelector;
