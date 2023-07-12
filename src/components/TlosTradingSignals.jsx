import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TlosTradingSignals() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [signal, setSignal] = useState(null);
    const [lastClose, setLastClose] = useState(null);
    const [lastSMA, setLastSMA] = useState(null);
    const [rsi, setRsi] = useState(null);

    const calculateSMA = (data, smaPeriods) => {
        let sma = data.reduce((accumulator, currentValue, currentIndex, array) => {
            if (currentIndex >= smaPeriods) {
                accumulator.push(array.slice(currentIndex - smaPeriods, currentIndex).reduce((a, b) => a + b) / smaPeriods);
            }
            return accumulator;
        }, []);
        return sma;
    }

    const calculateRSI = (close, rsiPeriods) => {
        let changes = close.slice(1).map((num, idx) => num - close[idx]);

        let gains = changes.filter(num => num > 0).reduce((a, b) => a + b, 0);
        let losses = changes.filter(num => num < 0).reduce((a, b) => a + b, 0) * -1;

        let averageGain = gains / rsiPeriods;
        let averageLoss = losses / rsiPeriods;

        let rs = averageGain / averageLoss;

        let rsi = 100 - (100 / (1 + rs));
        return rsi;
    }

    useEffect(() => {
        const fetchOHLCV = async () => {
            try {
                const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=TLOS&tsym=USDT&limit=200');
                let data = response.data.Data.Data.map(x => x.close);
                return data;
            } catch (error) {
                throw error;
            }
        }

        const getTradingSignal = async () => {
            try {
                setLoading(true);
                const close = await fetchOHLCV();
                let sma = calculateSMA(close, 20);
                let rsiValue = calculateRSI(close, 14);
    
                setLastClose(close.slice(-1)[0]);
                setLastSMA(sma.slice(-1)[0]);
                setRsi(rsiValue);
    
                // adjusted for bias
                if (lastClose > lastSMA && rsiValue < 21) { // lowered threshold for long bias
                    setSignal('Buy');
                } else if (rsiValue > 96) { // very high RSI, consider a stronger selling signal 'Short'
                    setSignal('Short');
                } else if (rsiValue > 91) { // raised threshold for short bias
                    setSignal('Sell');
                } else {
                    setSignal('Hold');
                }
    
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        }
    

        getTradingSignal();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <p>Telos Trade Signal: <strong>{signal}</strong></p>
            <p>Last Close: {lastClose}</p>
            <p>Last SMA: {lastSMA}</p>
            <p>RSI: {rsi}</p>
        </div>
    );
}

export default TlosTradingSignals;
