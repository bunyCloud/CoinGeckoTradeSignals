import React,{useEffect, useState} from 'react';
import axios from 'axios';

export default function EthCoinGecko() {
    const [currentPrice, setCurrentPrice] = useState(null);

    useEffect(() => {
        const fetchCurrentPrice = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
                setCurrentPrice(response.data[0].current_price);
            } catch (error) {
                console.error("Error fetching current price:", error);
            }
        };
        fetchCurrentPrice();
    }, []);

    if (currentPrice === null) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <p>Current Ethereum Price: ${currentPrice}</p>
        </div>
    );
}
